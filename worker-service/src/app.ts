import {
    ApplicationState,
    Logger,
    MessageBrokerChannel,
    SettingsContainer,
    ValidateConfiguration
} from '@guardian/common';
import { Worker } from './api/worker';
import { HederaSDKHelper } from './api/helpers/hedera-sdk-helper';
import { ApplicationStates } from '@guardian/interfaces';
import { decode } from 'jsonwebtoken';
import * as process from 'process';

Promise.all([
    MessageBrokerChannel.connect('WORKERS_SERVICE')
]).then(async values => {
    const channelName = (process.env.SERVICE_CHANNEL || `worker.${Date.now()}`).toUpperCase()
    const [cn] = values;
    const channel = new MessageBrokerChannel(cn, 'worker');

    const logger = new Logger();
    logger.setConnection(cn);
    const state = new ApplicationState(channelName);
    state.setConnection(cn);
    await state.updateState(ApplicationStates.STARTED);

    HederaSDKHelper.setTransactionLogSender(async (data) => {
        await channel.request(`guardians.transaction-log-event`, data);
    });

    const settingsContainer = new SettingsContainer();
    settingsContainer.setConnection(cn);
    await settingsContainer.init('IPFS_STORAGE_API_KEY');

    await state.updateState(ApplicationStates.INITIALIZING);
    const w = new Worker();
    await w.setConnection(cn).init();

    const validator = new ValidateConfiguration();

    let timer = null;
    validator.setValidator(async () => {
        if (timer) {
            clearInterval(timer);
        }
        if (process.env.IPFS_PROVIDER === 'web3storage') {
            if (!settingsContainer.settings.IPFS_STORAGE_API_KEY) {
                return false;
            }

            try {
                const decoded = decode(settingsContainer.settings.IPFS_STORAGE_API_KEY);
                if (!decoded) {
                    return false
                }
            } catch (e) {
                return false
            }
        }
        if (process.env.IPFS_PROVIDER === 'local') {
            if (!process.env.IPFS_NODE_ADDRESS) {
                return false
            }
        }

        return true;
    });

    validator.setValidAction(async () => {
        await state.updateState(ApplicationStates.READY);
        logger.info('Worker started', [channelName]);
    });

    validator.setInvalidAction(async () => {
        timer = setInterval(async () => {
            await state.updateState(ApplicationStates.BAD_CONFIGURATION);
        }, 1000)
    });

    await validator.validate();
}, (reason) => {
    console.log(reason);
    process.exit(0);
})
