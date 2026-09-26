# Technical Specifications for IWA Digital Measurement, Reporting and Verification (dMRV) Framework, Version 3.0

## Living Standard, 8 January 2026

**This version:**

[https://interworkalliance.github.io/TokenTaxonomyFramework/dmrv/spec/index.html](https://interworkalliance.github.io/TokenTaxonomyFramework/dmrv/spec/index.html)

**Issue Tracking:**

[Inline In Spec](#issues-index)

**Editors:**

[Marley Gray (Oxy)](https://oxy.com/)

[Jackson Ross (GBBC)](https://gbbc.org/) [jackson.ross@gbbcouncil.org](mailto:jackson.ross@gbbcouncil.org)

---

## Abstract

This document is the technical specification for the draft Digital Measurement, Reporting, and Verification (dMRV) Framework Version 3.0. It is intended for software developers, business analysts, data scientists, and ecosystem stakeholders involved in designing or implementing digital MRV solutions for environmental assets. This document presents a revision to the second version of the dMRV Framework, published in late 2023. The InterWork Alliance (IWA) and Global Blockchain Business Council (GBBC) members have extensively shared the framework throughout the sustainability ecosystem, identifying missing elements, refining definitions, and striving to establish common standards for unifying ecological and environmental product manufacturing or origination processes, such as for voluntary carbon credits. This specification supersedes its predecessor entirely due to the diligent efforts and collaboration of its contributors. The biggest change in Version 3.0 is the introduction of Extension Sets, a grouping of templates which encompasses entities, messages, formulae, and variables that are specific to the Quality Standard or Methodology that the Activity Impact Module is bound to. They are typically composed of multiple MRV Extensions for modules or activities and can be defined by the supplier, verifier, and issuer based on a set of methodology modules. Extension Sets can be organized into Extension Set Modules that act as a shared library of MRV Extensions available to participants in the dMRV process. Through this process, we aim to create reusable libraries that dMRV participants can use while allowing for the contribution of new Extension Sets from third parties as methodologies are further digitized. Version 3.0 also includes the renaming and grouping of certain data fields for clarity based on feedback received by the IWA from various stakeholders. Please send any feedback you may have on this draft specification to iwa@gbbc.io.

## 1. Background

The lifecycle of environmental or ecological credits, such as carbon or renewable energy credits, includes two main phases: origination (or manufacturing) and distribution. The origination phase involves the creation or issuance of a credit from an issuing authority, comparable to commodity origination processes like agriculture or raw materials, where the work is done to grow and harvest the crop in preparation for distribution. The transition from origination to distribution necessitates different infrastructure and requirements, ranging from supporting data collection and verification during manufacturing to facilitating marketplace and exchange activities for trading and settlement. The dMRV Framework focuses specifically on the origination phase of ecological assets.

Within the origination phase, there are two sub-phases: Validation and Verification. The validation phase entails the process for a project to be validated by an issuing program before credits can be issued. This phase encompasses project design, location, plan, involved parties, governance, adjacent impacts on society, and establishing a baseline for measuring impacts. The outcome of this phase typically results in a Project Design Description (PDD) document, which serves as the official recognition and resource for project information. The validation phase is governed by the issuing registry and conducted by a Validation and Verification Body (VVB). A project is usually validated for multiple years.

The verification phase involves subsequent monitoring of the data points outlined in the validation phase and reporting this data to the VVB for verification. The verification findings are then reported to the issuing registry, which issues a credit for the verified impact to the project. Historically, the validation phase has represented the majority of the effort for establishing projects and issuing credits, often taking a year or more to complete. This extended timeframe is primarily due to early projects being land- and nature-based, such as forestry or land use, which could not produce direct evidence of impact over short periods of time. Consequently, trust anchors were established based on the validation phase, with annual issuances relying on indirect evidence or factoring to calculate carbon reduction or avoidance.

Recently, environmental markets have shifted with the introduction of engineered projects and a focus on carbon removal rather than reductions or avoidances. These new technology-based solutions, such as solar, wind, or direct air capture, utilize digital sensors that produce large volumes of highly accurate and verifiable data. This shift emphasizes verification during the origination phase over project validation.

Engineered projects are typically operated by established corporate entities, have smaller land footprints, and require faster issuance times—often monthly instead of annually. Engineered environmental projects, including renewable energy and carbon capture and storage, should prioritize verification over validation, reflecting the shift in trust anchors from a project’s reputation established during validation to proof of impact accurately measured in near real-time during verification. The Digital MRV Framework is optimized for these new types of engineered projects, which generate substantial quantities of precise measurement data for verification, thereby directly proving energy output or carbon sequestration.

Currently, there are multiple open standard initiatives, such as the Carbon Data Open Protocol (CDOP) and the Integrity Council for the Voluntary Carbon Market (ICVCM), aimed at unifying carbon project data from project validation and credit issuance. The Digital MRV Framework can introduce an open standard for verification and implement a new "effort scale" between validation and verification based on project type, moving away from a one-size-fits-all approach.

## 2. Introduction

The Digital MRV (dMRV) Framework outlines the terminology, roles, process workflows, generic evidence packaging, and attestations that digital MRV solutions should follow to create the next generation of environmental credits as digital assets. The framework establishes a common roles-based process along with an extensible data model to maintain a consistent taxonomy across infrastructure and asset classes, allowing for customization to accommodate various activities that can produce these new assets. It describes an asset origination supply chain (dMRV network), where different roles are responsible for different parts of the process.

For instance, a project developer, who performs the work generating environmental benefits, provides raw measurement data and evidence into the supply chain. The verifier then validates this evidence against a quality standard, such as methodology, ensuring its accuracy and reliability. The verifier generates a report used to issue the digital asset, such as a carbon credit, and passes the report to the issuing registry.

The framework aims to support investments in, and the generation of, high-quality, data-backed ecological assets at scale. It specifies the entities and processes enabling the application of various standards, protocols, and technologies that can collaboratively produce high-quality projects and claims, ready for validation and verification.

This document serves as the technical specification for the dMRV Framework. It is intended for software developers, business analysts, data scientists, and others seeking to understand the data model and its entities, such as tokens, agreements, and data extensions, defined by this specification.

### 2.1. Status of this Document

Although this is the released Version 3.0 of the framework, comments regarding the document are welcome, for IWA members, please file issues directly on [GitHub](https://github.com/InterWorkAlliance/TTF/issues), using the `dMRV` label. Branching feedback can be made via pull request by branching and editing the [GitHub Spec](https://github.com/InterWorkAlliance/TTF/blob/main/dmrv/spec/index.bs) Bikeshed source directly.

Feedback from non-members is welcome via email to [iwa](mailto:iwa@gbbcouncil.org)

The technical specifications within this document are the result of consent processses by GBBC/IWA members and other external sources.

### 2.2. Scope

The scope of this document is to reach consensus on a tokenized orgination process that describes the behaviors, common data model, schema or data dictionary and encoding standard of the process for the IWA Enivornmental Markets working group to represent the data entities involved in the origination process for the resulting digital assets.

### 2.3. Regarding the Token Taxonomy Framework

The Token Taxonomy Framework (TTF) is the IWA’s primary tool for defining an open specification for a token. It focuses on defining individual tokens but does not offer a framework for defining sets of related tokens involved in broader processes. This artifact will complement, rather than replace, the tokens defined in the TTF. The tokens and their data models from this artifact will be utilized to define the tokens within the TTF.

Token definitions will be titled as _Token & Data Type_ to make it clear that the token is defined in the context of the data model. All other data types are considered Property Sets in the TTF.

Placing all of the token definitions and especially the data model in a single artifact makes it easier to understand the relationships and dependencies between the tokens.

Additionally, a single agreement that governs the process of origination, the Origination Process Agreement, see [§ 4.31 Agreement & Data Type: OriginationProcessAgreement](#dt-origination-process-agreement), is defined in this artifact. This agreement is used to establish the parties and their roles in the origination process.

### 2.4. Intended Audience

This technical specification is for

-   software developers who want to build software to edit, exchange or store data in the format defined by this specification

-   business analysts who want to understand the data model and data dictionary defined by this specification

-   data scientists who want to understand the data model and data dictionary defined by this specification

-   anyone else who wants to understand the data model and data dictionary defined by this specification

### 2.5. About the Environmental Markets Working Group

The IWA Environmental Markets Working Group is a working group of the InterWork Alliance (IWA) that is focused on the develoment of standards for the creation of digital assets that represent the environmental benefits of voluntary ecological markets.

The lifecycle of these assets has two main phases: **origination** and distribution. The _origination_ phase is the process of creating the digital asset and the _distribution_ phase is the process of distributing the digital asset to the market, e.g., marketplaces, exchanges, DeFi, etc.

This document and the specifications are aimed at the **origination phase** of the lifecycle.

### 2.6. Disclaimer

While IWA encourages the implementation of the technical specifications by all entities for interoperability, those organiazations and individuals who contributed to the development of this document do not assume responsibility for any consequences or damages resulting directly or indirectly from the use of this document.

### 2.7. License

The license can be found in [Appendix A: License](#license).

## 3. Terminology

**<a id="dmrv"></a>dMRV**

Digital Measurement, Reporting and Verification, also a Namespace in the framework.

**<a id="accountable-impact-organization"></a>Accountable Impact Organization**

An Accountable Impact Organization undertakes activities to achieve specific environmental outcomes measured by Activity Impact Modules (AIMs). Multiple AIMs can target different objectives, following a particular Quality Standard. For instance, an agricultural project may have separate AIMs for carbon removal and biodiversity conservation. Carbon Capture and Storage projects may have distinct modules for capture, transport, and storage phases. This structure allows the organization to manage various types of credits or organize activities into separate modules for streamlined issuance.

The encoding of an Accountable Impact Organization in the data model is specified in [§ 4.2 Token & Data Type: AccountableImpactOrganization](#dt-accountable-impact-organization)

**<a id="activity-impact-module"></a>Activity Impact Module (AIM)**

An Activity Impact Module, AIM, can represent a single project with all [§ 4.55 Data Type QualityStandard](#dt-quality-standard) modules represented in a single AIM, or span multiple AIMs where each AIM represents a different module within a project and be grouped into project modules of a Origination Process Agreement [§ 4.31 Agreement & Data Type: OriginationProcessAgreement](#dt-origination-process-agreement). Each AIM has a defined scope and a defined set of activities that are intended to achieve a defined set of outcomes. The outcomes of the project are typically environmental benefits and follow a spcific Quality Standard, i.e. methodology.

A AIM is scoped or bound to a quality standard/methodology that it follows along with a physical location or boundary that defines where the project activities occur. For example, a land based project would be scoped to an area/polygon on a map and an engineered sequestion based project would be scoped to a power plant/GPS/INSS.

An Accountable Impact Organization can have multiple AIMs, but there cannot be another AIM using the same benefit type/quality standard/methodology and location.

The encoding of a Activity Impact Module in the data model is specified in [§ 4.4 Data Type: ActivityImpactModule](#dt-activity-impact-module)

**<a id="quality-standard"></a>Quality Standard**

A quality standard is a generic term for the methodology or protocol(s) that are used to validate a project and measure, report and verify the environmental benefits of an Activity Impact Module. The quality standard may include additional project validation requirements and be composed of different combinations of tools to calculate things like Additionally, etc.

The encoding of a Quality Standard in the data model is specified in [§ 4.55 Data Type QualityStandard](#dt-quality-standard)

**<a id="verification-automation"></a>Verification Automation**

Solutions, platforms, services, etc., designed to accelerate the verification of claims. Depending on the Quality Standard, it may be able, with appropriate audit requirements, to perform full verification of claims issuance of impact credits. For other Quality Standards, these platforms or services may automate and prepare findings data that are evaluated by a VVB in order to speed up and support a continuous verification process.

**<a id="impact-claim"></a>Impact Claim**

An impact claim is a collection of the evidence data submitted according to the quality standard being followed by the AIM for a claim period. A claim period is typically the same as the issuing cadence, i.e., monthly or annually. An impact claim is composed of one or more checkpoints.

The encoding of an Impact Claim in the data model is specified in [§ 4.9 Token & Data Type: ImpactClaim](#dt-impact-claim)

**<a id="checkpoint"></a>Checkpoint**

An impact claim checkpoint is a collection of the evidence data submitted periodically to an impact claim. The checkpoint is a cryptographic fingerprint of the evidence data contained within a Data Package to establish the provenance and integrity of the evidence being submitted.

The encoding of an Checkpoint in the data model is specified in [§ 4.10 Data Type: Checkpoint](#dt-checkpoint)

**<a id="data-package"></a>Data Package**

A data package, is the data package file, i.e. .zip file, that contains the raw evidence data being submitted with a checkpoint.

The encoding of a Data Package in the data model is specified in [§ 4.11 Data Type: DataPackage](#dt-data-package)

**<a id="data-package-manifest"></a>Data Package Manifest**

A data package has a manifest.json file in the root of the package file that contains the metadata about the contents of the file as well as extensible metadata that is specific for the quality standard being followed.

The encoding of a Manifest in the data model is specified in [§ 4.12 Data Type: Manifest](#dt-manifest)

**<a id="processed-claim"></a>Processed Claim**

For each Impact Claim, there is a Processed Claim used by the Verifier to record verification outcomes. A processed claim is the Impact Claim’s corresponding collection of checkpoint results that are generated by the verifier.

The encoding of a Processed Claim in the data model is specified in [§ 4.29 Token & Data Type: ProcessedClaim](#dt-processed-claim)

**<a id="checkpoint-result"></a>Checkpoint Result**

A Checkpoint Result is paired with a corresponding Checkpoint for the claim being processed and contains the results of the verification of the checkpoint.

The encoding of a Checkpoint Result in the data model is specified in [§ 4.30 Data Type: CheckpointResult](#dt-checkpoint-result)

**<a id="project-modules"></a>Project Modules**

The Origination Process Agreement can have a group of Activity Impact Modules, Project Modules, that are grouped together to combine claims from multiple projects, potentially from different organizations, into a single group claim. A carbon credit may require several different modules and claims to be combined to create a single credit, the AIMs would be grouped together in an Origination Process Agreement, even in scenarios involving different organizations.

For example, Carbon Capture and Storage (CCS) may require a project developer to capture CO2 from a plant, then hand it off to a different organization to transport the CO2 to a storage facility, then a third organization to store the CO2. Each of these organizations would have their own AIM and claim, but only one credit will be issued for the combined claims. The AIMs would be grouped together in an OriginationProcessAgreement, their claims would be combined into an ClaimGroup for a single credit to be issued for the group. Since an Activity Impact Module can be a member of multiple agreement/groups, when a claim is created it must identify the Claim Group it will belong to.

**<a id="claim-group"></a>Claim Group**

An ClaimGroup is a group of Impact and Processed Claim pairs that are grouped together to combine claims from multiple projects (AIMs), potentially from different organizations, into a single claim for processing.

A ClaimGroup is a member of only one Origination Process Agreement.

The encoding of a Claim Group in the data model is specified in [§ 4.14 Data Type: ClaimGroup](#dt-claim-group)

**<a id="extension"></a>Extension**

An Extension can be an `Entity`, `Message`, `Formula` or `Variable` extension to the data model that is specific to the quality standard being followed. These extensions are used to extend the data model and process to support the specific requirements of the quality standard and can be contextually applied to the appropriate data types. For example, an Entity Extension can be applied to an Activity Impact Module to support the data requirements of a specific quality standard. An Extension Message Pair can be defined to add a process step to a claim verification for one party to request something from another and be recorded as a request/response message pair in the proper context of the business process.

Each extension must have an extension template defined in an Extension Set. There are templates for each extension type, Entity Extension Template, Message Pair, Formula Template and Variable Template. Templates are defined in an Extension Set that is shared by all participants in the dMRV Process as a way of creating structured data and messaging to digitize the MRV Process.

To use an extension, a template must be defined first, then an extension instance can be created from the template and applied.

The encoding of an Extension in the data model is specified in [§ 4.22 Data Type: FormulaTemplate](#dt-formula-template) & [§ 4.23 Data Type: Formula](#dt-formula), [§ 4.24 Data Type: VariableTemplate](#dt-variable-template) & [§ 4.25 Data Type: Variable](#dt-variable), [§ 4.20 Data Type: EntityExtensionTemplate](#dt-entity-template) & [§ 4.21 Data Type: EntityExtension](#dt-entity), [§ 4.17 Data Type: MessagePair](#dt-message-pair) & [§ 4.18 Data Type: Message](#dt-message)

**<a id="extension-set"></a>Extension Set**

An extension set is a grouping of Extension Templates that can be organized into ExtensionSetModules that is the shared library of available extensions available for use by the participants in the dMRV process.

ExtensionSets and Templates are how specific Quality Standards are digitally implemented in the framework.

The encoding of an Extension Set in the data model is specified in [§ 4.15 Data Type: ExtensionSet](#dt-extension-set)

**<a id="origination-process-agreement"></a>Origination Process Agreement**

A multiparty agreement between the parties involved in the origination and digital MRV process that is central to the process. It defines the roles, rules, quality standard and the ExtensionSet that can be used by the participants. Every dMRV origination process must have a Origination Process Agreement in place and is the `rule book` that governs the process.

The encoding of a Origination Process Agreement in the data model is specified in [§ 4.31 Agreement & Data Type: OriginationProcessAgreement](#dt-origination-process-agreement)

**<a id="carbon-removal-or-reduction-credit---cru"></a>Carbon Removal or Reduction Credit - CRU**

A CRU can represent either a carbon removal or reduction credit. The difference is that a carbon removal credit is a credit that is issued for the removal of carbon from the atmosphere, while a carbon reduction credit is a credit that is issued for the reduction of carbon emissions.

This is just one example of a credit definition. New types of credits can be defined and applied to the framework.

The encoding of a CRU in the data model is specified in [§ 4.32 Token & Data Type: CRU](#dt-cru)

## 4. Tokens and their Data Model

This section specifies the tokens and their data model for the entities involved in the origination process to conform with this specification.

The data model consists of the following major data types:

1.  [AccountableImpactOrganization](#accountableimpactorganization): contains information identifying an individual or organization that will host one or more Activity Impact Module(s).

2.  [ActivityImpactModule](#activityimpactmodule): is parented by an Accountable Impact Organization that can have multiple AIMs and contains information identifying a project, or optionally a module for a project, that will host one or more Impact Claim(s).

3.  [ImpactClaim](#impactclaim): contains information identifying a claim that will host one or more Checkpoint(s).

4.  [DataPackage](#datapackage): contains information identifying a data package that will contain evidence or processed results of verification.

5.  [ProcessedClaim](#processedclaim): contains information identifying a processed claim that will host one or more Checkpoint Result(s).

6.  [OriginationProcessAgreement](#originationprocessagreement): contains the identifiers of the counterparties involved in the verification process and establishes the rules and procedures for the verification.

7.  [CRU](#cru): contains information identifying a carbon removal or reduction credit. This is the cononical example of an ecological asset and can be replaced by a different asset type, e.g., biodiversity, water, etc.

8.  [REC](#rec): contains information identifying a renewable energy credit. This is the cononical example of an ecological asset and can be replaced by a different asset type, e.g., biodiversity, water, etc.

Of these data types, the [CRU](#cru) and [REC](#rec) are the only tokens that are `traded` and `retired or redeemed` in the system. The other data types are used to support the origination process and provide the system of record for the data that backs the asset types.

Add data types, support data or entity extensions. This means that the data type can be extended to support additional data types that are specific to the quality standard being followed. For example, the DataPackage data type can be extended to support the data types required by specific methodologies or quality standards.

Not all data types defined in this artifact are tokens, but are a <a id="property-set"></a>Property-Set which are a collection of properties grouped together that can be used or composed into other property-sets or be present in many token definitions.

### 4.1. Data Model

The following diagram shows a high-level data model for this specification, including the relationships between the them. This model is quite large can be downloaded from [here](https://interworkalliance.github.io/TokenTaxonomyFramework/dmrv/spec/Vem-2.5-lt-hiera.png).

![The following diagram shows a high-level data model for this](<./Technical Specifications for IWA Digital Measurement, Reporting and Verification \(dMRV\) Framework, Version 3.0_files/IWA-v3-model.png>)

<a id="dt-accountable-impact-organization"></a>

### 4.2. Token & Data Type: <a id="accountableimpactorganization"></a>AccountableImpactOrganization

`AccountableImpactOrganization` is a data type which represents the individual or organization that will host one or more ActivityImpactModule(s).

This data type is used to represent a one to many relationship that can occur when an Accountable Impact Organization wishes to create multiple types of ecological assets and not have to establish an organiazational identity for each type of asset.

#### 4.2.1. Base Token and Behaviors

The AccountableImpactOrganization has a Non-Fungilble base that has the following behaviors:

1.  <a id="transferable"></a>Transferable (t): The AccountableImpactOrganization can be transferred from one party to another.

2.  <a id="divisible"></a>Divisible (d): The AccountableImpactOrganization can be divided into multiple AccountableImpactOrganization tokens, up to 2 decimal places.

3.  <a id="burnable"></a>Burnable (b): The AccountableImpactOrganization can be burned, retired or permanently deactivated.

TTF base formula with behaviors is: \[τN{_d,t,b_}\]

#### 4.2.2. Properties

An Accountable Impact Organization has the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-accountableimpactorganization-id"></a>`id` : [Id](#id) | String | M | The Organization’s unique identifier, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-accountableimpactorganization-name"></a>`name` | String | M | The name of the Accountable Impact Organization. |
| <a id="element-attrdef-accountableimpactorganization-description"></a>`description` : | String | M | A brief description of the Accountable Impact Organization. |
| addresses : [Address](#address) | Array | M | The non-empty set of addresses. Each value can represent physical, mailing and or legal addresses. See [§ 4.3 Data Type Address](#dt-address) for details. |
| <a id="element-attrdef-accountableimpactorganization-owners"></a>`owners` : [Id](#id) | Array | M | The non-empty set of [Id](#id). Each of the values in the set is supposed to uniquely identify each owner of the project. |
| <a id="element-attrdef-accountableimpactorganization-informationlink"></a>`informationLink` : [VerifiedLink](#verifiedlink) | String | M | A URI for information, i.e., webpage. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) |
| <a id="element-attrdef-accountableimpactorganization-medialinks"></a>`mediaLinks` : [VerifiedLink](#verifiedlink) | Array | O | An array of optional media links. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) |
| <a id="element-attrdef-accountableimpactorganization-attestations"></a>`attestations` : [Attestation](#attestation) | Array | O | An array of optional attestations including tags. See [§ 4.51 Data Type: Attestation](#dt-attestation) |
| <a id="element-attrdef-accountableimpactorganization-activityimpactmodules"></a>`activityImpactModules` : [ActivityImpactModule](#activityimpactmodule) | Array | M | A collection of ActivityImpactModules that belong to this Accountable Impact Organization. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of optional MrvExtensions, see [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |

*Properties of data type AccountableImpactOrganization*

<a id="dt-address"></a>

### 4.3. Data Type <a id="address"></a>Address

An address is a collection of address lines, city, state, postal code and country that can represent physical, legal or mailing addresses.

#### 4.3.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-address-addresstype"></a>`addressType` : `[AddressType](#enumdef-addresstype)` | AddressType | M | The type of the address. See [§ 4.90 Data Type: AddressType](#dt-address-type) for details. |
| <a id="element-attrdef-address-addresslines"></a>`addressLines` : [String](#string) | Array | M | A collection of address lines. |
| <a id="element-attrdef-address-city"></a>`city` : | String | M | The city of the address. |
| <a id="element-attrdef-address-state"></a>`state` : | String | M | The state of the address. |
| <a id="element-attrdef-address-postalcode"></a>`postalCode` : | String | M | The postal code of the address. |
| <a id="element-attrdef-address-country"></a>`country` : | String | M | The country of the address. |

*Properties of data type Address*

<a id="dt-activity-impact-module"></a>

### 4.4. Data Type: <a id="activityimpactmodule"></a>ActivityImpactModule

A ActivityImpactModule represents the actual project work that will generate benefits. It is bound to to Quality Standard and is where claims are issued from. An AIM can represent a project as a whole, or be modularized to represent a specific part of a project and be correlated using a correlation identifier.

#### 4.4.1. Scope of a ActivityImpactModule

Each ActivityImpactModule is scoped:

1.  To a parent Accountable Impact Organization, which can host multiple Activity Impact Modules

2.  Is bound or mapped to a QualityStandard that matches the AIM activities

3.  Must be unique for its geographic footprint and Quality Standard

#### 4.4.2. Properties

A ActivityImpactModule has the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the AIM, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-activityimpactmodule-aioid"></a>`aioId` : [Id](#id) | String | M | The unique identifier for the parent Accountable Impact Organization, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-activityimpactmodule-isgrouped"></a>`isGrouped` : [Boolean](https://infra.spec.whatwg.org/#boolean) | Boolean | M | False by default, if true, this AIM is a part of at least one Origination Process Agreement with multiple Project Modules. It can be a member of agreement groups, for example, if the project provides captured CO2 to multiple storage facilities. |
| name : | String | M | The name of the ActivityImpactModule |
| <a id="element-attrdef-activityimpactmodule-classificationcategory"></a>`classificationCategory` : `[ClassificationCategory](#enumdef-classificationcategory)` | String | M | The string representaion classification category of the ActivityImpactModule, see [§ 4.79 Data Type: ClassificationCategory](#dt-classification-category) for details. |
| <a id="element-attrdef-activityimpactmodule-classificationmethod"></a>`classificationMethod` : `[Method](#enumdef-method)` | String | M | The string representation of the classification method used to generate the benefit, see [§ 4.84 Data Type: Method](#dt-method) for details.
-   Natural, where the benefit is generated by natural processes

-   Technical, where the benefit is generated by technical processes, i.e. engineered.

-   Natural and Technical, where the benefit is generated by both natural and technical processes

 |
| <a id="element-attrdef-activityimpactmodule-benefitcategory"></a>`benefitCategory` : `[UN-SDGs](#enumdef-un-sdgs)` | String | M | The string representation of the benefit category of the ActivityImpactModule. The value MUST be a valid UN Sustainable Development Goal (UN SDG) code. See [§ 4.92 Data Type: UN-SDGs](#dt-un-sdgs) for details. |
| <a id="element-attrdef-activityimpactmodule-projectscope"></a>`projectScope` : `[ProjectScope](#enumdef-projectscope)` | String | M | The string representation scope of the AIM, maps to the scope of the Quality Standard. See [§ 4.93 Data Type: ProjectScope](#dt-project-scope) for details. |
| <a id="element-attrdef-activityimpactmodule-projecttype"></a>`projectType` : `[ProjectType](#enumdef-projecttype)` | String | M | The type of the AIM, maps to the scope of the Quality Standard. See [§ 4.94 Data Type: ProjectType](#dt-project-type) for details. |
| <a id="element-attrdef-activityimpactmodule-projectscale"></a>`projectScale` : `[ProjectScale](#enumdef-projectscale)` | String | M | String representation of scale, see [§ 4.88 Data Type: ProjectScale](#dt-project-scale) for details. MICRO = less than 1000 tCO2e SMALL = 1000 - 10000 tCO2e MEDIUM = 10000 - 100000 tCO2e LARGE = 100000 - 1000000 tCO2e Micro, Small, Medium or Large |
| <a id="element-attrdef-activityimpactmodule-country"></a>`country` : [ISO3166CC](#iso3166cc) | String | M | The country where the project is located. The value MUST be a valid ISO 3166-1 alpha-2 country code. See [§ 4.106 Data Type: ISO3166CC](#dt-iso3166cc) for details. |
| <a id="element-attrdef-activityimpactmodule-region"></a>`region` : `[Region](#enumdef-region)` | String | M | The region the project is located in. |
| <a id="element-attrdef-activityimpactmodule-arbid"></a>`arbId` : | String | O | If present, this is the California Air Resources Board (ARB) project identifier. |
| <a id="element-attrdef-activityimpactmodule-geographiclocation"></a>`geographicLocation` : [GeographicLocation](#geographiclocation) | Object | M | This is the geographic location of the project. See [§ 4.54 Data Type: GeographicLocation](#dt-geographic-location) for details. |
| <a id="element-attrdef-activityimpactmodule-firstyearissuance"></a>`firstYearIssuance` : | String | O | If present, this is the year credits were first issued for the project. |
| <a id="element-attrdef-activityimpactmodule-registryprojectid"></a>`registryProjectId` : | String | O | If present, this is the Id assigned by the issuing registry for the project on their system. |
| <a id="element-attrdef-activityimpactmodule-developers"></a>`developers` : [Id](#id) | Array | M | List of developers for the project. See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-activityimpactmodule-sponsors"></a>`sponsors` : [Id](#id) | Array | M | List of sponsors, i.e., financiers, etc. for the project. See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-activityimpactmodule-claimsources"></a>`claimSources` : [ClaimSource](#claimsource) | Object | M | A collection of claim evidence sources for the project, i.e., sensors, meters, applications, etc. See [§ 4.8 Data Type: ClaimSource](#dt-claim-source) for details. |
| <a id="element-attrdef-activityimpactmodule-impactclaims"></a>`impactClaims` : [ImpactClaim](#impactclaim) | Object | M | A collection of impact claims for the project. See [§ 4.9 Token & Data Type: ImpactClaim](#dt-impact-claim) for details. |
| <a id="element-attrdef-activityimpactmodule-validations"></a>`validations` : [Validation](#validation) | Object | M | A collection of validations for the project. See [§ 4.5 Data Type: Validation](#dt-validation) for details. |
| <a id="element-attrdef-activityimpactmodule-attestations"></a>`attestations` : [Attestation](#attestation) | Array | O | An array of optional attestations including tags. See [§ 4.51 Data Type: Attestation](#dt-attestation) |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of entity extensions for the project. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |
| formulaTemplates : [FormulaTemplate](#formulatemplate) | Array | O | A collection of Formula Templates for the project. See [§ 4.23 Data Type: Formula](#dt-formula) for details. |
| fixedVariables : [Variable](#variable) | Array | O | A collection of fixed variables for the project, i.e. emission factors. See [§ 4.25 Data Type: Variable](#dt-variable) for details. |

*Properties of data type ActivityImpactModule*

<a id="dt-validation"></a>

### 4.5. Data Type: <a id="validation"></a>Validation

Represents the validation steps and artifacts created in the validation phase of a project. These would include Project Design Documents (PDD), etc.

#### 4.5.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-validation-requestdate"></a>`requestDate` : [DateString](#datestring) | String | M | The request date for validation. See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| <a id="element-attrdef-validation-validationdate"></a>`validationDate` : [DateString](#datestring) | Date | M | The date of the validation. See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| <a id="element-attrdef-validation-validatingpartyid"></a>`validatingPartyId` : | String | M | The Id of the validating party, see [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-validation-validationmethod"></a>`validationMethod` : | String | M | The validation method used for the project, can include a version identifier. |
| <a id="element-attrdef-validation-validationexpirationdate"></a>`validationExpirationDate` : [DateString](#datestring) | String | M | The date of the validation expires. See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| <a id="element-attrdef-validation-validationsteps"></a>`validationSteps` : [ValidationStep](#validationstep) | Array | M | A collection of Validation Steps. See [§ 4.6 Data Type: ValidationStep](#dt-validation-step) for details. |

*Properties of data type Validation*

<a id="dt-validation-step"></a>

### 4.6. Data Type: <a id="validationstep"></a>ValidationStep

A validation step is a single step in the validation process, a validation process can be composed of multiple steps each step can generate its own artifact like a Project Design Document.

#### 4.6.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-validationstep-validationstepname"></a>`validationStepName` : | String | M | The name of the validation step. |
| <a id="element-attrdef-validationstep-validationstepdescription"></a>`validationStepDescription` : | String | M | The description of the validation step. |
| <a id="element-attrdef-validationstep-validationstepstatus"></a>`validationStepStatus` : `[ValidationStepStatus](#enumdef-validationstepstatus)` | ValidationStepStatus | M | The ValidationStepStatus of the validation step. See [§ 4.89 Data Type: ValidationStepStatus](#dt-validation-step-status) for details. |
| <a id="element-attrdef-validationstep-stepdocumentlink"></a>`stepDocumentLink` : [VerifiedLink](#verifiedlink) | VerifiedLink | M | The artifact generated by the validation step. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |

*Properties of data type ValidationStep*

<a id="dt-project-module"></a>

### 4.7. Data Type: <a id="projectmodule"></a>ProjectModule

The Project Module is an Activity Impact Module that is a part of a Origination Process Agreement. An agreement can also have a group of them in order to combine claims from multiple project, potentially from different organizations, into a single claim. A carbon credit may require several different modules and claims to be combined to create a single credit, the AIMs would be grouped together in an ActivityImpactGroup, even accross different organizations.

#### 4.7.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| aimId : [Id](#id) | String | M | Unique identifier for the ActivityImpactModule, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| description | String | M | The description of the ProjectModule, i.e., Capture, Transport, Storage, etc. |
| extensionSetId : [Id](#id) | String | M | The unique identifier for the ExtensionSet, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| extensionSetModuleId : [Id](#id) | String | M | The unique identifier for the ExtensionSetModule, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| vvbId : [Id](#id) | String | M | The unique identifier for the VVB, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| verificationPlatformId : [Id](#id) | String | M | The unique identifier for the verification platform, See [§ 4.105 Data Type: Id](#dt-id) for details. |

*Properties of data type ProjectModule*

<a id="dt-claim-source"></a>

### 4.8. Data Type: <a id="claimsource"></a>ClaimSource

A ClaimSource is a registered source of evidence data to support a claim. A claim source can be a device like a sensor or meter, an application that collects user data or reference data like satellite imagery.

#### 4.8.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the ClaimSource, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-claimsource-aimid"></a>`aimId` : [Id](#id) | String | M | The unique identifier for the parent ActivityImpactModule, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| name : | String | M | A name for the source. |
| description : | String | M | Description of the source and other details like the type of data collected, the frequency of collection, GPS/Location, etc. |
| location : [GeographicLocation](#geographiclocation) | Object | M | GNSS, i.e., GPS coordinates, for the source. See [§ 4.54 Data Type: GeographicLocation](#dt-geographic-location) for details. |
| <a id="element-attrdef-claimsource-sourcetype"></a>`sourceType` : `[ClaimSourceType](#enumdef-claimsourcetype)` | String | M | String representing the source type can include sensor, meter, application, reference, etc. See [§ 4.83 Data Type: ClaimSourceType](#dt-claim-source-type) for details. |
| <a id="element-attrdef-claimsource-unitofmeasure"></a>`unitOfMeasure` : `[UnitOfMeasure](#enumdef-unitofmeasure)` | String | M | The string representation for unit of measure, see [§ 4.101 Data Type: UnitOfMeasure](#dt-unit) for details. |
| <a id="element-attrdef-claimsource-reportingfrequency"></a>`reportingFrequency` : `[ReportingFrequency](#enumdef-reportingfrequency)` | String | M | The string representation for Reporting Frequency, see [§ 4.100 Data Type: ReportingFrequency](#dt-reporting-frequency) for details. |
| <a id="element-attrdef-claimsource-sourceidentifier"></a>`sourceIdentifier` : | string | M | this can be the unique identifier for the device, like a serial number, public key, etc. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of optional MrvExtensions, see [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |
| variableTemplates : [VariableTemplate](#variabletemplate) | Array | O | A collection of optional Variable Templates, see [§ 4.24 Data Type: VariableTemplate](#dt-variable-template) for details. |

*Properties of data type ClaimSource*

<a id="dt-impact-claim"></a>

### 4.9. Token & Data Type: <a id="impactclaim"></a>ImpactClaim

An ImpactClaim represents the actual project work that will generate benefits through out the claim period that is agreed to by the developer, VVB and Registry. ImpactClaims are created by a ActivityImpactModule and contains metadata about the claim period as well as a collection of checkpoints that are used to submitted project evidence that is verified by the VVB or Verification Automation.

#### 4.9.1. Base Token and Behaviors

The ImpactClaim has a Non-Fungilble base that has the following behaviors:

1.  <a id="indivisible"></a>Indivisible (~d): The ImpactClaim is indivisible, meaning it cannot be divided into multiple ImpactClaim tokens.

2.  <a id="non-transferable"></a>Non-transferable (~t): The ImpactClaim is non-transferable, meaning it cannot be transferred to another parent Accountable Impact Organization/AIM.

3.  <a id="delegable"></a>Delegable (g): The ImpactClaim can have certain behaviors delegated to another party.

4.  <a id="encumberable"></a>encumberable (e): The ImpactClaim can be encumbered by a third party, typically the verification automation or VVB.

5.  <a id="processedclaimcontrol"></a>ProcessedClaimControl (PCC): The ImpactClaim also has this <a id="behavior-group"></a>Behavior-Group with a set of behaviors a bundled and configured to control the processing of the ImpactClaim.

    -   <a id="mintable"></a>Mintable (m): The ImpactClaim can be minted, i.e., created, by the parent ActivityImpactModule.

    -   <a id="roles"></a>Roles (r): The ImpactClaim can have roles assigned to it, i.e., the VVB, Verifier, etc. that has the ability to burn or retire the claim after processing has completed.

    -   Burnable (b): The ImpactClaim can be burned, i.e., retired, by the VVB or Verifier.

TTF base formula with behaviors is: \[τN{_~d,~t,g,e,PCC_}\]

#### 4.9.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the ImpactClaim, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| aimId : [Id](#id) | String | M | The unique identifier for the parent ActivityImpactModule, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-impactclaim-processedclaimid"></a>`processedClaimId` : [Id](#id) | String | M | The unique identifier for the corrisponding processed claim that the verification automation uses to track the verification process and results of a claim. See [§ 4.105 Data Type: Id](#dt-id) for details. The value can be null until a processed claim is created. |
| <a id="element-attrdef-impactclaim-claimgroupid"></a>`claimGroupId` : [Id](#id) | String | O | The id of the ClaimGroup that the claim is associated with, will be null if not part of a group. |
| startDate: [DateString](#datestring) | String | M | The start date of the claim period. See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| endDate: [DateString](#datestring) | String | M | The end date of the claim period. See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| <a id="element-attrdef-impactclaim-unit"></a>`unit` : `[UnitOfMeasure](#enumdef-unitofmeasure)` | String | M | The unit of measurement/analysis of the project. See Data Type [§ 4.101 Data Type: UnitOfMeasure](#dt-unit) for further information. |
| quantity : [Decimal](#decimal) | Decimal | O | Optional, the estimated benefit quantity. |
| <a id="element-attrdef-impactclaim-co-benefits"></a>`co-benefits` : [Co-benefit](#co-benefit) | Object | O | Optional list of co-benefits associated with the ImpactClaim. See [§ 4.37 Data Type: Co-Benefit](#dt-co-benefit) for details. |
| <a id="element-attrdef-impactclaim-checkpoints"></a>`checkpoints` : [Checkpoint](#checkpoint) | Object | M | A collection of checkpoints for the ImpactClaim. See [§ 4.10 Data Type: Checkpoint](#dt-checkpoint) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of entity extensions for the claim. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |
| formulas : [Formula](#formula) | Array | O | A collection of formulas for the claim. See [§ 4.23 Data Type: Formula](#dt-formula) for details. |

*Properties of data type ImpactClaim*

<a id="dt-checkpoint"></a>

### 4.10. Data Type: Checkpoint

The impact claim checkpoint is a collection of evidence that is submitted by the developer to support the claim. The VVB or verification automation will review the evidence and provide a status of the evidence in a corresponding CheckpointResult in the processed claim.

Checkpoints are used to periodically submit evidence on an agreed upon basis from the ActivityImpactModule to the VVB or verification automation. This enables the development of continous verification of the project and the ability to provide feedback to the developer on the status of the project and the evidence submitted before the end of the claim period.

#### 4.10.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : | String | M | Unique identifier for the Checkpoint, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-checkpoint-claimid"></a>`claimId` : | String | M | The unique identifier for the parent ImpactClaim, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-checkpoint-claimsourceids"></a>`claimSourceIds` : [Id](#id) | Array | M | A list of registered claim sources submitting evidence in this checkpoint. See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-checkpoint-projectdeveloperid"></a>`projectDeveloperId` : | String | M | The Id of the project developer that is submitting the checkpoint, must be a developer registered in the [ActivityImpactModule](#activityimpactmodule). This is used when multiple identities may submit a checkpoint for a claim, for example one party may submit evidence of carbon capture and another may submit evidence of sequestration to support a carbon removal claim. See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-checkpoint-efbefore"></a>`efBefore` : | String | O | Environmental factor before activity - i.e., total emissions = 3 tCO2e |
| <a id="element-attrdef-checkpoint-efafter"></a>`efAfter` : | String | O | Environmental factor after activity - i.e., total emissions = 2 tCO2e. |
| <a id="element-attrdef-checkpoint-checkpointdaterange"></a>`checkpointDateRange` : [DateRange](#daterange) | DateRange | M | The date range for the checkpoint. See [§ 4.58 Data Type: DateRange](#dt-date-range) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of entity extensions for the checkpoint. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |
| variables : [Variable](#variable) | Array | O | A collection of variables for the checkpoint, i.e. sensor reading summaries, etc. See [§ 4.25 Data Type: Variable](#dt-variable) for details. |
| <a id="element-attrdef-checkpoint-datapackages"></a>`dataPackages` : [DataPackage](#datapackage) | Array | O | Optional, collect and store the data packages for the checkpoint, this contains be the Json string contents of the manifest.json in the Data Package root and the [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) to the data file. See [§ 4.11 Data Type: DataPackage](#dt-data-package) for details. |

*Properties of data type Checkpoint*

<a id="dt-data-package"></a>

### 4.11. Data Type: <a id="datapackage"></a>DataPackage

A data package is an index and metadata file that is stored in the root of the DataPackage file that is submitted with a checkpoint. It contains meta data about the evidence files contained in the package as well as extensible MRV data that is specific to the Quality Standard/Methodology the AIM is bound to.

#### 4.11.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| manifest : [Manifest](#manifest) | Object | M | The manifest object, a serialized JSON object that contains the metadata for the DataPackage. See [§ 4.12 Data Type: Manifest](#dt-manifest) for details. |
| <a id="element-attrdef-datapackage-verifiedlinktocheckpointdata"></a>`verifiedLinkToCheckpointData` : [VerifiedLink](#verifiedlink) | Object | M | A VerifiedLink that contain the evidence, in a data package submitted by the AIM. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |

*Properties of data type DataPackage*

<a id="dt-manifest"></a>

### 4.12. Data Type: <a id="manifest"></a>Manifest

The Data Package has a manifest.json file that is an extensible JSON object that contains the metadata about the contents in the Data Package. The manifest contains a list of files that are contained in the Data Package and the metadata about the files. The manifest also contains extensible MRV data that is specific to the Quality Standard/Methodology the AIM is bound to.

#### 4.12.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | The unique identifier for the Data Package, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| version: [String](#string) | String | M | The versions of the Data Package specification, default is 1.0.0. |
| aioId : [Id](#id) | String | M | The unique identifier for the Accountable Impact Organization, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| aimId : [Id](#id) | String | M | The Activity Impact Module that the Data Package is sourced from. |
| claimId : [Id](#id) | String | M | The Impact Claim that the Data Package, if it is sourced from. See, [§ 4.105 Data Type: Id](#dt-id) for details. |
| processedClaimId : [Id](#id) | String | M | The Processed Claim that the Data Package, if it is sourced from. See, [§ 4.105 Data Type: Id](#dt-id) for details. |
| projectDeveloperId : [Id](#id) | String | M | The Project Developer that submitted the Data Package, See, [§ 4.105 Data Type: Id](#dt-id) for details. |
| created : [DatePoint](#datepoint) | DatePoint | M | The DatePoint that the Data Package was created. See [§ 4.59 Data Type: DatePoint](#dt-date-point) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of one or more Entity Extensions that are specific to the Quality Standard/Methodology the AIM is bound to. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |
| files : [DataFile](#datafile) | Array | M | The files that are in the Data Package, see [§ 4.13 Data Type: DataFile](#dt-data-file) for details. |

*Properties of data type Manifest*

<a id="dt-data-file"></a>

### 4.13. Data Type: <a id="datafile"></a>DataFile

A DataFile is a set of metadata about an evidence file contained within the Data Package.

#### 4.13.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| name : [String](#string) | String | M | The name of the file. |
| type : [String](#string) | String | M | The string representation of the file type, see [§ 4.72 Data Type: FileType](#dt-data-file-type) for details. |
| description : [String](#string) | String | M | A description of the contents of the file. |
| claimSourceId : [Id](#id) | String | M | The id for the claim source registered with the [ActivityImpactModule](#activityimpactmodule) that the file is sourced from. |
| claimSourceAttestation : [DigitalSignature](#digitalsignature) | Object | O | The source attestation or signature for the file. See [§ 4.46 Data Type: DigitalSignature](#dt-digital-signature) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of optional MrvExtensions. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |

*Properties of data type File*

<a id="dt-claim-group"></a>

### 4.14. Data Type: <a id="claimgroup"></a>ClaimGroup

An ClaimGroup is a group of Impact and Processed Claim pairs that are grouped together in order to combine claims from multiple projects (AIM), potentially from different organizations, into a single claim for processing.

#### 4.14.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the ClaimGroup, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| opaId : [Id](#id) | String | M | Unique identifier for the Origination Process Agreement the Claim Group belongs to, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| name | String | M | The name of the ClaimGroup. |
| description | String | M | A description of the ClaimGroup. |
| <a id="element-attrdef-claimgroup-impactclaims"></a>`impactClaims` : [ImpactClaim](#impactclaim) | Object | M | Collection of Impact Claims in the group. See [§ 4.9 Token & Data Type: ImpactClaim](#dt-impact-claim) for details. |
| <a id="element-attrdef-claimgroup-processedclaims"></a>`processedClaims` : [ProcessedClaim](#processedclaim) | Object | M | Collection of Processed Claims in the group. See [§ 4.9 Token & Data Type: ImpactClaim](#dt-impact-claim) for details. |

*Properties of data type ClaimGroup*

<a id="dt-extension-set"></a>

### 4.15. Data Type: <a id="extensionset"></a>ExtensionSet

A collection of Extensions (`Entity`, `Message`, `Formula` or `Variable`) and Modules that are specific to the Quality Standard/Methodology the AIM is bound to, typically comprosised of multiple MRV Extensions for modules or activities. A ExtensionSet can be defined by the supplier, verifier and issuer based on a set of methodology modules to form reusable libraries for the MRV process for all parties.

#### 4.15.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.15.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the MRV Extension Set, this is a string that is defined by the verifier or verification automation. |
| name : [String](#string) | String | M | The name of the MRV Extension Set, this is a string that is defined by the verifier or verification automation. |
| version: [String](#string) | String | M | The versions of the MRV Extension Set specification, default is 1.0.0. |
| description : [String](#string) | String | M | A description of the MRV Extension Set, this is a string that is defined by the verifier or verification automation describing the purpose of the extension. |
| <a id="element-attrdef-extensionset-documentation"></a>`documentation` :[String](#string) | String | O | A link to the documentation for the MRV Extension Set, see [§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation) for details. |
| modules : [ExtensionSetModule](#extensionsetmodule) | Array | M | A collection of Extension Modules for the Quality Standard. See [§ 4.16 Data Type: ExtensionSetModule](#dt-extension-set-module) for details. |
| entityExtensionTemplates : [EntityExtensionTemplate](#entityextensiontemplate) | Array | O | A collection of MRV Entity Templates for the whole Quality Standard, meaning these can apply to all child modules as well. See [§ 4.20 Data Type: EntityExtensionTemplate](#dt-entity-template) for details. |
| extensionMessage : [MessagePair](#messagepair) | Array | O | A collection of MRV Extension Message Pairs for the whole Quality Standard, meaning these can apply to all child modules as well. See [§ 4.17 Data Type: MessagePair](#dt-message-pair) for details. |
| formulaTemplates : [FormulaTemplate](#formulatemplate) | Array | O | A collection of MRV Formula Templates for the whole Quality Standard, meaning these can apply to all child modules as well. See [§ 4.22 Data Type: FormulaTemplate](#dt-formula-template) for details. |
| variableTemplates : [VariableTemplate](#variabletemplate) | Array | O | A collection of MRV Variable Templates for the whole Quality Standard, meaning these can apply to all child modules as well. See [§ 4.24 Data Type: VariableTemplate](#dt-variable-template) for details. |

*Properties of data type ExtensionSet*

<a id="dt-extension-set-module"></a>

### 4.16. Data Type: <a id="extensionsetmodule"></a>ExtensionSetModule

A MRV Extension St Module is a collection of MRV Extensions that are specific to the Quality Standard/Methodology the AIM is bound to, typically comprosised of multiple MRV Extensions for modules or activities. A ExtensionSetModule, categorizes MrvExtensions into modules like, "Carbon Capture", "Carbon Sequestration", "Carbon Removal", etc.

Templates for Entity Extensions, Messages, Formulas and Variables defined at the module level can only apply to the module and its child modules.

#### 4.16.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.16.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the MRV Extension, this is a string that is defined by the verifier or verification automation. |
| name : [String](#string) | String | M | The name of the MRV Extension, this is a string that is defined by the verifier or verification automation. |
| version: [String](#string) | String | M | The versions of the MRV Extension specification, default is 1.0.0. |
| description : [String](#string) | String | M | A description of the MRV Extension, this is a string that is defined by the verifier or verification automation describing the purpose of the extension. |
| <a id="element-attrdef-extensionsetmodule-documentation"></a>`documentation` :[String](#string) | String | O | A link to the documentation for the MRV Extension, see [§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation) for details. |
| entityExtensionTemplates : [EntityExtensionTemplate](#entityextensiontemplate) | Array | M | A collection of Entity Templates for the Module. See [§ 4.20 Data Type: EntityExtensionTemplate](#dt-entity-template) for details. |
| messagePairs : [MessagePair](#messagepair) | Array | O | A collection of Extension Message Pairs for the Module. See [§ 4.17 Data Type: MessagePair](#dt-message-pair) for details. |
| formulaTemplates : [FormulaTemplate](#formulatemplate) | Array | O | A collection of Formula Templates for the Module. See [§ 4.22 Data Type: FormulaTemplate](#dt-formula-template) for details. |
| variableTemplates : [VariableTemplate](#variabletemplate) | Array | O | A collection of Variable Templates for the Module. See [§ 4.24 Data Type: VariableTemplate](#dt-variable-template) for details. |

*Properties of data type ExtensionSetModule*

<a id="dt-message-pair"></a>

### 4.17. Data Type: <a id="messagepair"></a>MessagePair

A Extension Message Pair is a defined set of Request and Response messages that used to communicate and drive MRV Process between the parties involved in the MRV process, i.e., the supplier, verifier, issuer.

#### 4.17.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.17.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Extension Message Pair, this is a string that is defined by the verifier or verification automation. |
| name : [String](#string) | String | M | The name of the Extension Message Pair, this is a string that is defined by the verifier or verification automation. |
| version: [String](#string) | String | M | The versions of the Extension Message Pair specification, default is 1.0.0. |
| description : [String](#string) | String | M | A description of the Extension Message Pair, this is a string that is defined by the verifier or verification automation describing the purpose of the extension. |
| <a id="element-attrdef-messagepair-documentation"></a>`documentation` :[String](#string) | String | O | A link to the documentation for the Extension Message Pair, see [§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation) for details. |
| requestDefinition : [AnyData](#anydata) | Object | M | The request message definition for the Extension Message Pair. See [§ 4.18 Data Type: Message](#dt-message) for details. |
| responseDefinition : [AnyData](#anydata) | Object | M | The response message definition for the Extension Message Pair. See [§ 4.18 Data Type: Message](#dt-message) for details. |

*Properties of data type MessagePair*

<a id="dt-message"></a>

### 4.18. Data Type: <a id="message"></a>Message

A Extension Message is a defined message that is used to communicate and drive MRV Process between the parties involved, i.e., the supplier, verifier, issuer. It is recommended that these messages use Apache Avro and Json Schema to define the message structure, content and serialization.

#### 4.18.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.18.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Extension Message, this is a string that is defined by the verifier or verification automation. |
| messageType : `[MessageType](#enumdef-messagetype)` | String | M | The message type, request or response, see [§ 4.71 Data Type: MessageType](#dt-message-type) for details. |
| senderId: [String](#string) | String | M | The Id for the sender of the message. |
| <a id="element-attrdef-message-correlationid"></a>`correlationId` : [String](#string) | String | M | The correlation Id for the message will be the same for related messages, typically the initial request message’s id. |
| <a id="element-attrdef-message-conversationid"></a>`conversationId` : [String](#string) | String | O | A conversation Id for the message, this is used to track the conversation between the parties and should be set for message pairs that may have multiple requests and responses tied to a process. |
| closed | Boolean | O | A boolean that indicates if the conversation is closed, is optional for use by messaging implementations. |
| message : [AnyData](#anydata) | Object | M | The message for the Extension, these are the custom messages defined for the extension. See [§ 4.18 Data Type: Message](#dt-message) for details. |

*Properties of data type Message*

### 4.19. Data Type: <a id="anydata"></a>AnyData

Any data is used to represent a custom message type defined for Extensions. If the message is defined in a protocol buffer, the message will be serialized to protoData and the remaining fields will be null. If other serialization, a dataType can use a custom class or json schema to define the message type and the value will be serialized to value.

#### 4.19.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.19.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| protoData : [String](#string) | String | O | Serialized protocol buffer data in Json or byte string format. |
| dataType : [String](#string) | String | O | The data type that of the message, this will be extension and implementation specific, i.e. using protocol buffers, custom classes, or json schema for message types. |
| value: [String](#string) | String | O | Serialized data like Json or byte string |

*Properties of data type AnyData*

<a id="dt-entity-template"></a>

### 4.20. Data Type: <a id="entityextensiontemplate"></a>EntityExtensionTemplate

An Entity Extension Template is an extensible object (JSON, proto, etc.) that contains custom data that is specific to a Quality Standard/Methodology Entity. Entity Extension Templates can be defined by the methdology developers or the verifier, or verification automation to include attributes or data that is helpful to have on the ledger. entityExtensionTemplates are used to create [EntityExtension](#entityextension) instances and add to most entity types, i.e., [ActivityImpactModule](#activityimpactmodule), [ImpactClaim](#impactclaim), and [ProcessedClaim](#processedclaim) types.

The Entity Extension Template is defined and added to a [ExtensionSet](#extensionset) with an accompanying schema. The [ExtensionSet](#extensionset) is a part of the [OriginationProcessAgreement](#originationprocessagreement) and is used by participants to define the MRV process and data that is required for the verification process.

#### 4.20.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.20.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Entity Extension, this is a string that is defined by the verifier or verification automation. |
| name : [String](#string) | String | M | The name of the Entity Extension, this is a string that is defined by the verifier or verification automation. |
| version: [String](#string) | String | M | The versions of the Entity Extension specification, default is 1.0.0. |
| description : [String](#string) | String | M | A description of the Entity Extension, this is a string that is defined by the verifier or verification automation describing the purpose of the extension. |
| <a id="element-attrdef-entityextensiontemplate-documentation"></a>`documentation` :[String](#string) | String | O | A link to the documentation for the Entity Extension, see [§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation) for details. |
| extensionContext : `[ExtensionContext](#enumdef-extensioncontext)` | String | M | The type of extension and which entity it applies to, See [§ 4.69 Data Type: ExtensionContext](#dt-extension-context) for details. |
| dataSchemaOrType : [string](#string) | URI, URL or string | O\* | A link to the Json schema file for the Entity Extension that the `data` property follows or is mapped to. It also may contain a type name for direct serialization/de-serialization functionality. |
| dataExample | Object | O\* | A Json or byte string object that contains example data for the extension. |

*Properties of data type EntityExtensionTemplate*

<a id="dt-entity"></a>

### 4.21. Data Type: <a id="entityextension"></a>EntityExtension

An Entity Extension is an extensible object (JSON, proto, etc.) that contains custom data that is specific to a Quality Standard/Methodology Entity. Entity Extensions are an instance of an [EntityExtensionTemplate](#entityextensiontemplate) and can be added to most entity types, i.e., [ActivityImpactModule](#activityimpactmodule), [ImpactClaim](#impactclaim), and [ProcessedClaim](#processedclaim) types. An Entity Extension is used to add custom data to the entity that is not part of the core schema.

Entity Extensions are defined and reference their [EntityExtensionTemplate](#entityextensiontemplate) and added to a [ExtensionSet](#extensionset) with an accompanying schema. The [ExtensionSet](#extensionset) is a part of the [OriginationProcessAgreement](#originationprocessagreement) and is used by participants as the repository of extensions used for the Quality Standard/Methodology.

#### 4.21.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.21.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Entity Extension, this is a string that is defined by the verifier or verification automation. |
| templateId : [Id](#id) | String | M | The id for the Entity Extension Template that the Entity Extension is based on. |
| data : [AnyData](#anydata) | Object | M | The data for the Entity Extension, this is a custom object that is defined by the verifier or verification automation. |
| appliedToId : [Id](#id) | String | O | OPTIONAL - depending on data layer implementation, the entity id that the extension applies to. |
| extensionContext: `[ExtensionContext](#enumdef-extensioncontext)` | String | O | OPTIONAL - depending on data layer implementation, the context of the extension. |

*Properties of data type EntityExtension*

<a id="dt-formula-template"></a>

### 4.22. Data Type: <a id="formulatemplate"></a>FormulaTemplate

A Formula Template is a formula that is used to calculate the MRV data for a Quality Standard/Methodology. Formula Templates are composed into [ExtensionSet](#extensionset) and are used to calculate the MRV data for the Quality Standard/Methodology. A [Formula](#formula) is an instance from a Formula Template that is used to calculate the MRV data for a Quality Standard/Methodology and is applied to an [ActivityImpactModule](#activityimpactmodule).

#### 4.22.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.22.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Formula Template, this is a string that is defined by the verifier or verification automation. |
| name : [String](#string) | String | M | The name of the Formula Template, this is a string that is defined by the verifier or verification automation. |
| version: [String](#string) | String | M | The versions of the Formula Template specification, default is 1.0.0. |
| formula: [String](#string) | String | M | The formula for the Formula Template, this is a string that is defined by the verifier or verification automation. |
| description : [String](#string) | String | M | A description of the Formula Template, this is a string that is defined by the verifier or verification automation describing the purpose of the extension. |
| <a id="element-attrdef-formulatemplate-documentation"></a>`documentation` :[String](#string) | String | O | A link to the documentation for the Formula Template, see [§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation) for details. |
| dataSchemaOrType : [String](#string) | String | M | The data schema or type for the Formula Template, this is a string that is defined by the verifier or verification automation. |
| dataExample : [String](#string) | String | M | An example of the formula. |
| variableTemplates : [VariableTemplate](#variabletemplate) | Array | M | A collection of Variables Templates that are used in the formula. |

*Properties of data type FormulaTemplate*

<a id="dt-formula"></a>

### 4.23. Data Type: <a id="formula"></a>Formula

A Formula is an instance of a [FormulaTemplate](#formulatemplate) that is used to calculate the MRV data for a Quality Standard/Methodology. Formulas are applied to an [ActivityImpactModule](#activityimpactmodule) and are used to calculate the MRV data for the Quality Standard/Methodology. Formulas are composed of Variables that are used to calculate the MRV data for the Quality Standard/Methodology and are applied to entities like a [ActivityImpactModule](#activityimpactmodule).

#### 4.23.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.23.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Formula, this is a string that is defined by the verifier or verification automation. |
| templateId : [Id](#id) | String | M | The id for the Formula Template that the Formula is based on. |
| data : [AnyData](#anydata) | Object | M | The data for the Formula, this is a custom object that is defined by the verifier or verification automation. |
| variables : [Variable](#variable) | Array | M | A collection of Variables that are used in the formula. |
| extensionContext : `[ExtensionContext](#enumdef-extensioncontext)` | String | O | OPTIONAL - depending on data layer implementation, the entity context the formula belongs to. |

*Properties of data type Formula*

<a id="dt-variable-template"></a>

### 4.24. Data Type: <a id="variabletemplate"></a>VariableTemplate

A Variable Template is a variable that is used in a Formula Template to calculate the MRV data for a Quality Standard/Methodology. Variable Templates are composed into [FormulaTemplate](#formulatemplate) and are used to calculate the MRV data for the Quality Standard/Methodology.

A [Variable](#variable) is an instance from a Variable Template that is used to calculate the MRV data for a Quality Standard/Methodology and is applied to entities like a [ClaimSource](#claimsource).

#### 4.24.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.24.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Variable, this is a string that is defined by the verifier or verification automation. |
| name : [String](#string) | String | M | The name of the Variable, this is a string that is defined by the verifier or verification automation. |
| version: [String](#string) | String | M | The versions of the Variable specification, default is 1.0.0. |
| description : [String](#string) | String | M | A description of the Variable, this is a string that is defined by the verifier or verification automation describing the purpose of the extension. |
| <a id="element-attrdef-variabletemplate-documentation"></a>`documentation` :[String](#string) | String | O | A link to the documentation for the Variable, see [§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation) for details. |
| alias | String | O | An optional alias for the Variable, this is a useful for mapping external sources to the Variable. |
| dataSchemaOrType : [String](#string) | String | M | The data type or schema for the Variable, this is a string that is defined by the verifier or verification automation. |
| dataExample : [String](#string) | String | M | An example of the variable. |

*Properties of data type VariableTemplate*

#### 4.24.3. Data Type: <a id="variabletemplates"></a>VariableTemplates

A collection of VariableTemplate objects that are used in a Extension Sets and Claims.

<a id="dt-variable"></a>

### 4.25. Data Type: <a id="variable"></a>Variable

A Variable is an instance of a [VariableTemplate](#variabletemplate) that is used to calculate the MRV data for a Quality Standard/Methodology. Variables are used in Formula Templates to calculate the MRV data for the Quality Standard/Methodology. Variables are applied to entities like a [ClaimSource](#claimsource) or [Checkpoint](#checkpoint).

#### 4.25.1. Namespace

The ExtensionSet is a part of the `dmrv` namespace.

#### 4.25.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | A unique identifier for the Variable, this is a string that is defined by the verifier or verification automation. |
| templateId : [Id](#id) | String | M | The id for the Variable Template that the Variable is based on. |
| data : [AnyData](#anydata) | Object | M | The data for the Variable, this is a custom object that is defined by the verifier or verification automation. |
| claimSourceId : [Id](#id) | String | O | OPTIONAL - depending on data layer implementation, the id of the claim source the variable is derived from, typically a ClaimSource id. |
| extensionContext : `[ExtensionContext](#enumdef-extensioncontext)` | String | O | OPTIONAL - depending on data layer implementation, the entity context the variable belongs to. |

*Properties of data type Variable*

### 4.26. Data Type: <a id="variables"></a>Variables

A collection of Variable objects that are used in a Extension Sets and Claims.

<a id="extension-definition"></a>

### 4.27. Extension Schema File: <a id="extensiondefinition"></a>ExtensionDefinition

MRV extensions MAY define a [valid JSON Schema document according to the JSON Schema specification](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-01). The extension schema file defines the data encoding and syntactical data validation details.

Authors of extension schema definitions SHOULD attempt to add as many validation rules as possible such that data validation can be automated as much as possible.

Extension schemas SHOULD be defined in a way to make illegal extension representations unrepresentable.

Additional details which are not representable in JSON Schema such as data semantics or validation rules, MUST be defined in the extension documentation ([§ 4.28 Extension Documentation: ExtensionDocumentation](#extension-documentation)).

<a id="extension-documentation"></a>

### 4.28. Extension Documentation: <a id="extensiondocumentation"></a>ExtensionDocumentation

The extension documentation is a human-readable document that describes the extension in detail. Extension document MUST be written in English. The documentation CAN be offered as a translation in other languages as well.

The documentation MUST include:

1.  Version of the extension and the document. The value MUST be a string in the format `major.minor.patch` as defined in [Semantic Versioning 2.0.0](#biblio-semver "Semantic Versioning").

2.  If the extension was updated, the document MUST include a changelog. The changelog MUST contain a summary of the changes between subsequent versions.

3.  A description of the extension, including the business case addressed by the extension and the business value gained by extending the Pathfinder Data Model. 2.1 This includes methodological alignment of the extension, especially covering the alignment with the Pathfinder Framework if applicable.

4.  A public [URL](#biblio-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax") to the [§ 4.27 Extension Schema File: ExtensionDefinition](#extension-definition).

5.  A license declaration covering the documentation, the extension schema file, and their use.

6.  Electronic contact information on how to get in touch with the authors and maintainers of the extension.

<a id="dt-processed-claim"></a>

### 4.29. Token & Data Type: <a id="processedclaim"></a>ProcessedClaim

The verification automation or VVB creates a ProcessedClaim at the beginning of verification to track the verification process and support continous verification. A ProcessedClaim is paired with an ImpactClaim and also contains a collection of CheckpointResults where results for each checkpoint verified are recorded.

#### 4.29.1. Base Token and Behaviors

The ProcessedClaim has a Non-Fungible base with the following behaviors:

1.  Indivisible (~d): The ProcessedClaim is indivisible, meaning it cannot be divided into multiple ImpactClaim tokens.

2.  Non-transferable (~t): The ProcessedClaim is non-transferable, meaning it cannot be transferred to another parent Accountable Impact Organization/AIM.

3.  Delegable (g): The ProcessedClaim can have certain behaviors delegated to another party.

4.  <a id="credibleclaimcontrol"></a>CredibleClaimControl (CCC): The ProcessedClaim also has this Behavior-Group with a set of behaviors a bundled and configured to control the processing of the ImpactClaim.

    -   Mintable (m): The ProcessedClaim can be minted, i.e., created, by the parent ActivityImpactModule.

    -   Roles (r): The ProcessedClaim can have roles assigned to it, i.e., the Issuing Registry. that has the ability to burn or retire the claim after a credit has been issued.

    -   Burnable (b): The ProcessedClaim can be burned, i.e., retired, by the VVB or Verifier.

TTF base formula with behaviors is: \[τN{_~d,~t,g,CCC_}\]

#### 4.29.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [String](#string) | String | M | Unique identifier for the ProcessedClaim, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-processedclaim-opaid"></a>`opaId` : [String](#string) | String | M | The unique identifier for the parent OriginationProcessAgreement, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-processedclaim-impactclaimid"></a>`impactClaimId` : [String](#string) | String | M | The unique identifier for the paired ImpactClaim, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-processedclaim-claimgroupid"></a>`claimGroupId` : [Id](#id) | String | O | The id of the ClaimGroup that the claim is associated with, will be null if not part of a group. |
| <a id="element-attrdef-processedclaim-creditid"></a>`creditId` : [String](#string) | String | O | The unique identifier for the credit, once issued, associated with the ProcessedClaim, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| unit : `[UnitOfMeasure](#enumdef-unitofmeasure)` | String | M | The unit of measurement/analysis of the project. See Data Type [§ 4.101 Data Type: UnitOfMeasure](#dt-unit) for further information. |
| quantity : [Decimal](#decimal) | Decimal | M | The verified benefit quantity after the verification period is complete. |
| co-benefits : [Co-benefit](#co-benefit) | Object | M | A collection of co-benefits that should be attributed to the credit issued. See [§ 4.37 Data Type: Co-Benefit](#dt-co-benefit) for details. |
| formulas : [Formula](#formula) | Object | O | Optional collection of formulas that are used to calculate the MRV data for the Quality Standard/Methodology. See [§ 4.23 Data Type: Formula](#dt-formula) for details. |
| <a id="element-attrdef-processedclaim-checkpointresults"></a>`checkpointResults` : [CheckpointResults](#checkpointresult) | Object | M | A collection of checkpoint results for the ProcessedClaim. See [§ 4.30 Data Type: CheckpointResult](#dt-checkpoint-result) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Object | O | A collection of entity extensions that are specific to the Quality Standard/Methodology. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |
| <a id="element-attrdef-processedclaim-issuancerequest"></a>`issuanceRequest` : | Object | M | Since a processed claim is generic, it can contain an issuance request that contains the proposed asset type with values to the issuing registry to use as a consideration. For example, this field could contain as the proposed asset a CRU Token with the values that the verifier proposes after verification. This allows the processed claim to be used as the source for any type of asset or credit. |

*Properties of data type ProcessedClaim*

<a id="dt-checkpoint-result"></a>

### 4.30. Data Type: <a id="checkpointresult"></a>CheckpointResult

A CheckpointResult is summary and verified links to verification results for the corresponding Checkpoint, that is a child of a ProcessedClaim. The CheckpointResult enables continous verification of the project and the ability to provide feedback to the developer during the verification process.

#### 4.30.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [String](#string) | String | M | Unique identifier for the CheckpointResult, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| checkpointId : [String](#string) | String | M | The unique identifier for the corresponding Checkpoint being processed, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-checkpointresult-verifiedlinktoprocessdataresult"></a>`verifiedLinkToProcessDataResult` : [VerifiedLink](#verifiedlink) | Object | M | A VerifiedLink object that contain the processed data findings from verification. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |
| <a id="element-attrdef-checkpointresult-daterange"></a>`dateRange` : [DateRange](#daterange) | DateRange | M | The date range for the checkpoint being processed. See [§ 4.58 Data Type: DateRange](#dt-date-range) for details. |
| efBefore : [String](#string) | String | O | Verified environmental factor before activity - i.e., total emissions = 3 tCO2e |
| efAfter : [String](#string) | String | O | Verified environmental factor after activity - i.e., total emissions = 2 tCO2e. |
| status : CheckpointResultStatus | String | M | The status of the checkpoint result, see [§ 4.70 Data Type: CheckpointResultStatus](#dt-checkpoint-result-status) for details. |
| comment : [String](#string) | String | O | Any remarks or comments about the checkpoint result. |
| variables : [Variable](#variable) | Array | O | A collection of variables for the checkpoint\_result, i.e. verified sensor reading summaries, etc. See [§ 4.25 Data Type: Variable](#dt-variable) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Object | O | A collection of entity extensions that are specific to the Quality Standard/Methodology. See [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |

*Properties of data type CheckpointResult*

<a id="dt-origination-process-agreement"></a>

### 4.31. Agreement & Data Type: <a id="originationprocessagreement"></a>OriginationProcessAgreement

A OriginationProcessAgreement is an agreement between a developer, verifier and registry that defines the terms of the verification process. Shared properties of all the data entities in the validation and verification process are listed here, like the Quality Standard being used, the MRV Requirements, Claim Period, audit schedule, etc. The OriginationProcessAgreement is the indirect parent object for all the other data entities in the origination process.

#### 4.31.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [String](#string) | String | M | Unique identifier for the OriginationProcessAgreement, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| name : [String](#string) | String | M | The name of the Origination Process Agreement, usually the name of the project - name of the issuing registry. |
| description : [String](#string) | String | M | A description of the Origination Process Agreement and where special instructions are provided. |
| <a id="element-attrdef-originationprocessagreement-projectmodules"></a>`projectModules` : [ProjectModule](#projectmodule) | Object | M | A collection of project modules that are used in the verification process. See [§ 4.7 Data Type: ProjectModule](#dt-project-module) for details. |
| <a id="element-attrdef-originationprocessagreement-signatories"></a>`signatories` : [Signatory](#signatory) | Array | M | A collection of signatories, the AIM owner, Issuing Registry, VVB and verification platform are examples of signatories. See [§ 4.45 Data Type: Signatory](#dt-signatory) for details. |
| <a id="element-attrdef-originationprocessagreement-qualitystandard"></a>`qualityStandard` : [QualityStandard](#qualitystandard) | Object | M | The quality standard being used for the verification. See [§ 4.55 Data Type QualityStandard](#dt-quality-standard) for details. |
| <a id="element-attrdef-originationprocessagreement-mrvrequirements"></a>`mrvRequirements` : [MRVRequirements](#mrvrequirements) | Object | M | The MRV requirements being used for the verification. See [§ 4.56 Data Type MRVRequirements](#dt-mrv-requirements) for details. |
| <a id="element-attrdef-originationprocessagreement-agreementdate"></a>`agreementDate` : [DateString](#datestring) | String | M | The date the agreement was signed. See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| <a id="element-attrdef-originationprocessagreement-estimatedannualcredits"></a>`estimatedAnnualCredits` : | String | O | The quantity of credits that are expected to be generated annually. |
| <a id="element-attrdef-originationprocessagreement-auditschedule"></a>`AuditSchedule` : `[AuditSchedule](#enumdef-auditschedule)` | String | M | The string representation of the audit schedule, see [§ 4.91 Data Type: AuditSchedule](#dt-audit-schedule) for details. |
| <a id="element-attrdef-originationprocessagreement-audits"></a>`Audits` : [Audits](#audits) | Object | M | The audits that are required for the verification agreement. See [§ 4.44 Data Type: Audits](#dt-audits) for details. |
| entityExtensions : [EntityExtension](#entityextension) | Array | O | A collection of optional MrvEntityExtensions, see [§ 4.21 Data Type: EntityExtension](#dt-entity) for details. |

*Properties of data type OriginationProcessAgreement*

<a id="dt-cru"></a>

### 4.32. Token & Data Type: <a id="cru"></a>CRU

The Carbon Removal or Reduction Unit, is a digital asset or token that services as a credit represents 1 metric tonne of CO2e. This is a non-financial, un-regulated, intangible digital asset that behavies like a commodity and is ready for distribution.

This is one example of a specific type of token or credit that can represent the ecological or environmental benefits that can be traded and retired to net down effective emissions for the beneficiary.

Other types of credits can be created, and reuse all of the other data entities for the generic validation and verification process.

#### 4.32.1. Base Token and Behaviors

The CRU has a Non-Fungible base with the following behaviors:

1.  Divisible (d): The CRU can be divided into multiple CRU tokens, up to 4 decimal places.

2.  Transferable (t): The CRU can be transferred from one party to another.

3.  Encumberable (e): The CRU can be encumbered by a third party, typically by a listing agent for distribution.

4.  <a id="revokable"></a>Revokable (v): The CRU can be revoked by the issuer, typically if the credit is found to be invalid, i.e., a carbon reversal event.

5.  Delegable (g): The CRU can be delegated to a third party, typically by a listing agent in distribution scenarios.

6.  <a id="offsetable-supply-control"></a>Offsetable Supply Control (OSC): The CRU has a Behavior-Group for offseting and supply control with the following behaviors:

    -   Mintable (m): The CRU can be minted by the issuer.

    -   Roles (r): The CRU has a role for the issuer to be able to mint/issue and approve retirements.

    -   Burnable (b): The CRU can be burned or retired by the owner, or by delegation, but requires approval by the issuer and optionaly can include other metadata like reporting period and jurisdiction.

TTF base formula with behaviors is: \[τN{_d,t,e,v,g,_}\]

#### 4.32.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the CRU, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| quantity : [Decimal](#decimal) | Decimal | M | A quantity that is fractional to represent up to 8 decimal places, use a string or decimal for the quantity. |
| unit : `[UnitOfMeasure](#enumdef-unitofmeasure)` | String | M | The string representation of the unit of measure, see [§ 4.101 Data Type: UnitOfMeasure](#dt-unit) for details. |
| ownerId : [Id](#id) | string | M | The id for the owner of the CRU, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| listingAgentId : [String](#string) | String | M | The unique identifier for the listing agent, See [§ 4.105 Data Type: Id](#dt-id) for details. This could be a marketplace or exchange that has an encumberance on the CRU and can split or transfer their representations of the CRU to other parties on their system of record. |
| assetId : [Id](#id) | String | O | Typically the issuing registry’s master id or serial number that resides on their registry system. Could be empty or the same as the token’s id if not needed. |
| issuanceDate : [DateString](#datestring) | String | M | The date of credit issuance, see [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| vintage : [String](#string) | String | M | The vintage year of the credit for the project. |
| <a id="element-attrdef-cru-corecarbonprinciples"></a>`coreCarbonPrinciples` : [CoreCarbonPrinciples](#corecarbonprinciples) | Object | M | The CoreCarbonPrinciples for this CRU, see [§ 4.33 Data Type: CoreCarbonPrinciples](#dt-core-carbon-principles) for details. |
| <a id="element-attrdef-cru-climatelabels"></a>`climateLabels` : [ClimateLabel](#climatelabel) | Array | O | A collection of optional climate labels, see [§ 4.41 Data Type: ClimateLabel](#dt-climate-label) for details. |
| <a id="element-attrdef-cru-status"></a>`status` : `[CreditStatus](#enumdef-creditstatus)` | Status | M | The status of the CRU, see [§ 4.96 Data Type: CreditStatus](#dt-credit-status) for details. |
| <a id="element-attrdef-cru-referencedcru"></a>`referencedCru` : [ReferencedCredit](#referencedcredit) | Array | O | Used to hold values for reference a credits on another registry, there are likely to be more fields needed here so using a property-set instead of a single field. See [§ 4.43 Data Type: ReferencedCredit](#dt-referenced-credit) for details. |
| appliedToReportingPeriodId : [Id](#id) | String | O | Optional link to the Id of the reporting period the asset was retired for, if supported. See [§ 4.105 Data Type: Id](#dt-id) for details. |
| processedClaimId : [Id](#id) | String | M | The id for the ProcessedClaim that the CRU is based on, see [§ 4.105 Data Type: Id](#dt-id) for details. |
| issuerId : [Id](#id) | String | M | The id for the Issuing Registry, see [§ 4.105 Data Type: Id](#dt-id) for details. |

*Properties of data type CRU*

<a id="dt-core-carbon-principles"></a>

### 4.33. Data Type: <a id="corecarbonprinciples"></a>CoreCarbonPrinciples

The CoreCarbonPrinciples are a set of properties that are used to describe the carbon removal or reduction that follows the [ICVCM Core Carbon Principles](#biblio-icvcm "ICVCM - The Core Carbon Principles").

#### 4.33.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-corecarbonprinciples-generationtype"></a>`generationType` : `[GenerationType](#enumdef-generationtype)` | String | M | The string representation for how the credit was generated, see [§ 4.81 Data Type: GenerationType](#dt-generation-type) for details. |
| <a id="element-attrdef-corecarbonprinciples-verificationstandard"></a>`verificationStandard` : `[Standard](#enumdef-standard)` | String | M | The string representation of the verification standard, see [§ 4.97 Data Type: Standard](#dt-standard) for details. |
| <a id="element-attrdef-corecarbonprinciples-mitigationactivity"></a>`mitigationActivity` : [MitigationActivity](#mitigationactivity) | String | M | The string representation of the MitigationActivity, see [§ 4.53 Data Type: MitigationActivity](#dt-mitigation-activity) for details. |
| <a id="element-attrdef-corecarbonprinciples-durability"></a>`durability` : [Durability](#durability) | Object | M | The Durability properties for the credit, see [§ 4.34 Data Type: Durability](#dt-durability) for details. |
| <a id="element-attrdef-corecarbonprinciples-replacement"></a>`replacement` : [Replacement](#replacement) | Object | O | Present if the credit is a replacement credit, see [§ 4.36 Data Type: Replacement](#dt-replacement) for details. |
| <a id="element-attrdef-corecarbonprinciples-pacompliance"></a>`paCompliance` : [PACompliance](#pacompliance) | Object | M | The PACompliance properties for the credit, see [§ 4.39 Data Type: PACompliance](#dt-pa-compliance) for details. |
| quantifiedSDGImpacts : [Co-benefit](#co-benefit) | Array | O | An array of optional quantified impact cobenefits, see [§ 4.92 Data Type: UN-SDGs](#dt-un-sdgs) for details. |
| adaptionCoBenefits : `[UN-SDGs](#enumdef-un-sdgs)` | Array | O | An array of adaptation co-benefits of the token consistent with the host country’s priorities, consistent with the provisions under Article 7.1 of the Paris Agreement, see [§ 4.92 Data Type: UN-SDGs](#dt-un-sdgs) for details. |

*Properties of data type CoreCarbonPrinciples*

<a id="dt-durability"></a>

### 4.34. Data Type: <a id="durability"></a>Durability

The Durability properties are used to describe the durability of the carbon removal or reduction, its expected permanence, and the expected duration of the carbon removal or reduction. It includes the risk of reversal and how that risk is mitigated.

#### 4.34.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-durability-storagetype"></a>`storageType` : `[Storage](#enumdef-storage)` | String | M | The string representation of the Storage Type, see [§ 4.85 Data Type: Storage](#dt-storage) for details. |
| years : [WholeNumber](#wholenumber) | Number | M | The length of time in years that the carbon removal or reduction is expected to last. |
| <a id="element-attrdef-durability-degradable"></a>`degradable` : [Degradable](#degradable) | Object | M | The degradable properties for the credit, see [§ 4.35 Data Type: Degradable](#dt-degradable) for details. |
| <a id="element-attrdef-durability-reversalmitigation"></a>`reversalMitigation` : [ReversalMitigation](#reversalmitigation) | Object | M | The risk of reversal and how the risk is mitigated, see [§ 4.38 Data Type: ReversalMitigation](#dt-reversal-mitigation) for details. |

*Properties of data type Durability*

<a id="dt-degradable"></a>

### 4.35. Data Type: <a id="degradable"></a>Degradable

The Degradable properties are used to describe the degradation of the carbon removal or reduction.

#### 4.35.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| percentage : [WholeNumber](#wholenumber) | Number | M | The rate of degradation of the carbon removal or reduction, 0 = no degredation possible, 100 = all sequestered should be expected to be released |
| factor : [WholeNumber](#wholenumber) | Number | M | Factor of years for degredation, 25 = .25 per year if linear or exponential starts at 25% of durability years. |
| degredationType : `[DegradationType](#enumdef-degradationtype)` | String | M | A string representation of the degredation type, see [§ 4.65 Data Type: DegradationType](#dt-degradation-type) for details. |

*Properties of data type Degradable*

<a id="dt-replacement"></a>

### 4.36. Data Type: <a id="replacement"></a>Replacement

Replacement is used when a credit is replacing a revoked credit.

#### 4.36.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-replacement-replacesid"></a>`replacesId` : [String](#string) | String | M | The Id of the revoked credit being replaced. |
| <a id="element-attrdef-replacement-replacementdate"></a>`replacementDate` : [DateString](#datestring) | String | M | The date of the replacement, see [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| <a id="element-attrdef-replacement-notes"></a>`notes` : | String | O | Optional notes about the revokation and replacement |

Figure 1: [Replacement](#replacement) Properties

<a id="dt-co-benefit"></a>

### 4.37. Data Type: <a id="co-benefit"></a>Co-Benefit

Co-benefits currently map to the UN SDGs and include a description for how the benefit applies.

#### 4.37.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-co-benefit-un-sdg"></a>`un-sdg` : `[UN-SDGs](#enumdef-un-sdgs)` | String | M | The string representation of a UN SDG that the co-benefit applies to. See [§ 4.92 Data Type: UN-SDGs](#dt-un-sdgs) for details. |
| description | String | M | A description of how the co-benefit applies to the project or activity. |

*Properties of data type Co-Benefit*

<a id="dt-reversal-mitigation"></a>

### 4.38. Data Type: <a id="reversalmitigation"></a>ReversalMitigation

The ReversalMitigation properties are used to describe the risk of reversal and how the risk is mitigated.

#### 4.38.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| reversalRisk : `[ReversalRisk](#enumdef-reversalrisk)` | String | M | The string representation of the reversal risk. See [§ 4.66 Data Type: ReversalRisk](#dt-reversal-risk) for details. |
| insuranceType : `[DurabilityInsuranceType](#enumdef-durabilityinsurancetype)` | String | M | A string representation of the insurance type, see [§ 4.67 Data Type: DurabilityInsuranceType](#dt-durability-insurance-type) for details. |
| insurancePolicyOwner : `[InsurancePolicyOwner](#enumdef-insurancepolicyowner)` | String | M | A string representation of the insurance policy owner, see [§ 4.68 Data Type: InsurancePolicyOwner](#dt-insurance-policy-owner) for details. |
| insurancePolicyLink : [VerifiedLink](#verifiedlink) | Object | O | Link to the insurance policy, see [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |

*Properties of data type ReversalMitigation*

<a id="dt-pa-compliance"></a>

### 4.39. Data Type: <a id="pacompliance"></a>PACompliance

Details about a credit’s Paris Agreement Compliance.

#### 4.39.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-pacompliance-correspondingadjustment"></a>`correspondingAdjustment` : `[CorrespondingAdjustment](#enumdef-correspondingadjustment)` | String | M | The string status of the corresponding adjustment, see [§ 4.99 Data Type: CorrespondingAdjustment](#dt-corresponding-adjustment) for details. |
| <a id="element-attrdef-pacompliance-letterofapproval"></a>`letterOfApproval` : [VerifiedLink](#verifiedlink) | Object | O | Optional verified link to the letter of approval. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |
| <a id="element-attrdef-pacompliance-itmoid"></a>`itmoId` : [ITMOId](#itmoid) | String | O | Optional ITMO Id, see [§ 4.64 Data Type: ITMOId](#dt-itmo-id) for details. |

Figure 1: [PACompliance](#pacompliance) Properties

### 4.40. Token & Data Type: <a id="rec"></a>REC

The Renewable Energy Credit is an `example` token is a Fungible Token that represents the environmental benefits of a renewable energy project and is exchangeable for evidencing the production of electricity. The primary unit of measure for I-REC(E)s is the megawatt hour (MWh), with below megawatt hour resolution to the watt hour (Wh) as optional. Each unit of electricity is uniquely attributable to the source generation using the same project and claims process that other assets like the CRU originate from.

This is one example of a specific type of token or credit that can represent the ecological or environmental benefits that can be traded and retired to net down effective emissions for the beneficiary.

#### 4.40.1. Base Token and Behaviors

The REC has a Non-Fungible base with the following behaviors:

1.  Divisible (d): The REC can be divided into multiple REC tokens, up to 6 decimal places.

    -   `1.000000` = 1MW

    -   `0.001000` = 1kW

    -   `0.000001` = 1W

2.  Transferable (t): The REC can be transferred from one party to another.

3.  Encumberable (e): The REC can be encumbered by a third party, typically by a listing agent for distribution.

4.  Revokable (v): The REC can be revoked by the issuer, typically if the credit is found to be invalid, i.e., a carbon reversal event.

5.  Delegable (g): The REC can be delegated to a third party, typically by a listing agent in distribution scenarios.

6.  Offsetable Supply Control (OSC): The REC has a Behavior-Group for offseting and supply control with the following behaviors:

    -   Mintable (m): The REC can be minted by the issuer.

    -   Roles (r): The REC has a role for the issuer to be able to mint/issue and approve retirements.

    -   Burnable (b): The REC can be burned or retired by the owner, or by delegation, but requires approval by the issuer and optionaly can include other metadata like reporting period and jurisdiction.

TTF base formula with behaviors is: \[τF{_d,t,e,v,g,_}\]

#### 4.40.2. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the REC, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| type : `[RecType](#enumdef-rectype)` | String | M | The string representation of the REC type, see [§ 4.80 Data Type: RecType](#dt-rec-type) for details. |
| validJurisdiction : [String](#string) | String | O | Optional jurisdiction where of the REC can be redeemed, i.e. US-Texas, multiples separated by a comma. |
| quantity : [Decimal](#decimal) | Decimal | M | A quantity that is fractional to represent up to 8 decimal places, use a string or decimal for the quantity. |
| unit : `[UnitOfMeasure](#enumdef-unitofmeasure)` | String | M | The string representation of the unit of measure, see [§ 4.101 Data Type: UnitOfMeasure](#dt-unit) for details. |
| ownerId : [Id](#id) | string | M | The id for the owner of the REC, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| listingAgentId : [Id](#id) | String | M | The unique identifier for the listing agent, See [§ 4.105 Data Type: Id](#dt-id) for details. This could be a marketplace or exchange that has an encumberance on the REC and can split or transfer their representations of the REC to other parties on their system of record. |
| <a id="element-attrdef-rec-climatelabels"></a>`climateLabels` : [ClimateLabel](#climatelabel) | Array | O | A collection of optional climate labels, see [§ 4.41 Data Type: ClimateLabel](#dt-climate-label) for details. |
| <a id="element-attrdef-rec-status"></a>`status` : `[CreditStatus](#enumdef-creditstatus)` | Status | M | The status of the REC, see [§ 4.96 Data Type: CreditStatus](#dt-credit-status) for details. |
| <a id="element-attrdef-rec-referencedrec"></a>`referencedRec` : [ReferencedCredit](#referencedcredit) | Array | O | Used to hold values for reference a credits on another registry, there are likely to be more fields needed here so using a property-set instead of a single field. See [§ 4.43 Data Type: ReferencedCredit](#dt-referenced-credit) for details. |
| appliedToReportingPeriodId : [Id](#id) | String | O | Optional link to the Id of the reporting period the asset was retired for, if supported. See [§ 4.105 Data Type: Id](#dt-id) for details. |
| processedClaimId : [Id](#id) | String | M | The id for the ProcessedClaim that the REC is based on, see [§ 4.105 Data Type: Id](#dt-id) for details. |
| issuerId : [Id](#id) | String | M | The id for the Issuing Registry, see [§ 4.105 Data Type: Id](#dt-id) for details. |

*Properties of data type REC*

<a id="dt-climate-label"></a>

### 4.41. Data Type: <a id="climatelabel"></a>ClimateLabel

A ClimateLabel is a reference to an external data element that contains a climate label, typically set by the registry or methodology.

#### 4.41.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [String](#string) | String | M | Unique identifier for the ClimateLabel, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| name : [String](#string) | String | M | The name of the ClimateLabel. |
| description : [String](#string) | String | M | A description about how the label applies to the credit. |

*Properties of data type ClimateLabel*

<a id="dt-verified-link"></a>

### 4.42. Data Type: <a id="verifiedlink"></a>VerifiedLink

A VerifiedLink is a reference, URI or URL to an external data element along with a cryptographic fingerprint of the external data so that its integrity can be checked by any party.

#### 4.42.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the VerifiedLink, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-verifiedlink-uri"></a>`uri` :[String](#string) | String | M | The URI or URL of the external data element. |
| description : [String](#string) | String | M | A description of the link or data referenced. |
| hashProof: [String](#string) | String | M | The cryptographic hash of the external data element. |
| <a id="element-attrdef-verifiedlink-hashalgorithm"></a>`hashAlgorithm` : `[HashAlgorithm](#enumdef-hashalgorithm)` | String | M | The cryptographic hash algorithm used to generate the hash. See [§ 4.73 Data Type: HashAlgorithm](#dt-hash-algorithm) for details. |

*Properties of data type VerifiedLink*

<a id="dt-referenced-credit"></a>

### 4.43. Data Type: <a id="referencedcredit"></a>ReferencedCredit

A ReferencedCredit is used to hold values for credits that reference a credit on another registry, there are likely to be more fields needed here so using a property-set instead of a single field.

#### 4.43.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| referencedCreditId : [Id](#id) | String | M | Unique identifier for the referenced credit, this can be a serial number or a master id on the external registry. |
| registryLink : [VerifiedLink](#verifiedlink) | Object | M | VerifiedLink to the external registry for the referenced credit or asset, see [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |
| metadata : [String](#string) | String | O | Optional metadata about the referenced credit, json serialized as a string. |

*Properties of data type ReferencedCredit*

<a id="dt-audits"></a>

### 4.44. Data Type: <a id="audits"></a>Audits

Audits contain the audit schedule, date of last audit and the verified links to the audit reports for the verification agreement.

#### 4.44.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| lastAuditDate : [DateString](#datestring) | String | O | Date of the audit, See [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| auditReports : [VerifiedLink](#verifiedlink) | Array | M | A collection of VerifiedLinks to audit reports for the verification agreement, see [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) . |

*Properties of data type Audits*

<a id="dt-signatory"></a>

### 4.45. Data Type: <a id="signatory"></a>Signatory

A Signatory is a party that has signed a document or agreement. The Signatory is a digital entity or identity in a specific role in the dMRV process.

#### 4.45.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the signatory, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| name : [String](#string) | String | M | The individual or organization name in the role. |
| description : [String](#string) | String | M | A description of the signatory, notes or comments. |
| <a id="element-attrdef-signatory-signatoryrole"></a>`signatoryRole` : `[SignatoryRole](#enumdef-signatoryrole)` | String | M | The role of the signatory in the dMRV process. |
| <a id="element-attrdef-signatory-vvbidforaim"></a>`vvbIdForAim` : [Id](#id) | String | M | OPTIONAL: the the id of the VVB/verifier that is associated with the AIM, if there is a AIM group with multiple VVBs for different AIMs, this will be needed to map the VVB to the AIM. |
| <a id="element-attrdef-signatory-signature"></a>`signature` : [DigitalSignature](#digitalsignature) | Object | M | The digital signature of the signatory. |

*Properties of data type Signatory*

Data Type: DigitalSignature

<a id="dt-digital-signature"></a>

### 4.46. Data Type: <a id="digitalsignature"></a>DigitalSignature

A Signature is a digital signature of a document or agreement. The Signature is a digital entity or identity in a specific role in the dMRV process. Support for JWT and Verifiable Credentials is planned.

#### 4.46.1. Properties

A Signature contains the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| type : `[SignatureType](#enumdef-signaturetype)` | String | M | String representation of the enum SignatureType, see [§ 4.77 Data Type: SignatureType](#dt-signature-type) for details. |
| <a id="element-attrdef-digitalsignature-jws"></a>`jws` : [String](#string) | String | O | If using a JWS, this is the serialized JWS. |
| <a id="element-attrdef-digitalsignature-credential"></a>`credential` : [Credential](#credential) | Object | O | If using a Verifiable Credential, this is the VC. |

*Properties of data type Signature*

Data Type: Credential (data format, type (JWS, Verifiable Credential))

### 4.47. Data Type: <a id="credential"></a>Credential

A Credential is a digital credential that is an emerging W3C standard for Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs). As implementations of the standard emerge, the dMRV specification will be updated to reflect the standard. Implementations can use the current format and type of the credential as a placeholder until the standard is finalized.

It is expected that the Credential will be a JSON Web Signature (JWS) or a Verifiable Credential (VC) as defined by the W3C Verifiable Credentials Data Model 1.0 specification and can be used to assign a DID to a party, device, source, etc. in the dMRV process. These will be used for attestations, verifications, and signatures in the dMRV process.

See [W3C Verifiable Credentials Implementation Guidelines 1.0](https://w3c.github.io/vc-imp-guide/) for more information.

#### 4.47.1. Properties

A Credential contains the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-credential-context"></a>`context` : [String](#string) | Array | M | The context of the credential, an array of strings. |
| id : [String](#string) | String | M | The id of the credential, a string. |
| type : `[CredentialType](#enumdef-credentialtype)` | Array | M | The list of credential types, an array of strings. |
| issuer : [String](#string) | String | M | The issuer of the credential, a string. |
| issuanceDate : [DateString](#datestring) | String | M | The issuance date of the credential, a string, see [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| credentialSubject : [CredentialSubject](#credentialsubject) | Object | M | The subject of the credential, an object. |
| proof : [Proof](#proof) | Object | M | The proof of the credential, an object. |

*Properties of data type Credential*

### 4.48. Data Type: <a id="credentialsubject"></a>CredentialSubject

A CredentialSubject is the subject of a Credential.

#### 4.48.1. Properties

A CredentialSubject contains the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [String](#string) | String | O | Unique identifier for the credential subject, usually assigned if referencing another DiD, but an optional property. |
| property : [String](#string) | String | M | The subject may contain multiple properties, these can be presented as a Json string in a single property or an array of properties. |

*Properties of data type CredentialSubject*

### 4.49. Data Type: <a id="proof"></a>Proof

A Proof is a digital proof of a Credential.

#### 4.49.1. Properties

A Proof contains the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| type : `[ProofType](#enumdef-prooftype)` | String | M | String representation of the enum ProofType, see [§ 4.75 Data Type: ProofType](#dt-proof-type) for details. |
| created : [DateString](#datestring) | String | M | The creation date of the proof, a string, see [§ 4.60 Data Type: DateString](#dt-date-string) for details. |
| proofPurpose : [String](#string) | String | M | The purpose of the proof, a string. |
| verificationMethod : [String](#string) | String | M | The verification method of the proof, a string. |
| challenge : [String](#string) | String | O | Optional for Presentations for replay attacks, the challenge of the proof, a string. |
| domain : [String](#string) | String | O | Optional for Presentations for replay attacks, the domain of the proof, a string. |
| jws : [String](#string) | String | M | The JSON Web Signature of the proof, a string. |

*Properties of data type Proof*

### 4.50. Data Type: <a id="verifiablepresentation"></a>VerifiablePresentation

A VerifiablePresentation is a digital presentation of a Verifiable Credential or Digital Signature that is linked to a DID or Signatory.

#### 4.50.1. Properties

A VerifiablePresentation contains the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [String](#string) | String | M | The id of the presentation, a string. |
| type : `[SignatureType](#enumdef-signaturetype)` | String | M | The type of the presentation, a string. |
| holder : [String](#string) | String | M | The holder of the presentation, a string. |
| credentials : [Credential](#credential) | Array | M | The credentials of the presentation, an array of objects. |
| proof : [Proof](#proof) | Object | M | The proof of the presentation, an object. |

*Properties of data type VerifiablePresentation*

<a id="dt-attestation"></a>

### 4.51. Data Type: <a id="attestation"></a>Attestation

Attestations provide opportunities for context in MRV data. Conceptually, attestations can be the data within the project or the commentary around the project. For project data, “Direct Data Attestations” can come from individuals, project developers, verifiers, and/or directly from devices asserting an event that is represented digitally on the public ledger.

Attestations, metadata, or “Tags” describing digital entities, such as actors, calculations, or their quantifiable outcomes, allow for more context to exist about Accountable Impact Organizations or Impact Modules (AIM) within the market, which inherently have a relationship with credit pricing and can describe overall project effectiveness.

#### 4.51.1. Properties

An Attestation contains the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| tag : [Tag](#tag) | Object | M | Allow for more context and attributes to be applied to a data type and be `digitally signed`, see [§ 4.52 Data Type: Tag](#dt-tag) for details. |
| type : `[AttestationType](#enumdef-attestationtype)` | String | M | The type of the attestation, a string. |
| proof\_type : `[ProofType](#enumdef-prooftype)` | String | M | The type of the proof, a string. |
| attestor : [String](#string) | String | M | The attestor of the attestation, a string. |
| signature : [DigitalSignature](#digitalsignature) | Object | M | The signature of the attestation, an object. |

*Properties of data type Attestation*

<a id="dt-tag"></a>

### 4.52. Data Type: <a id="tag"></a>Tag

Are attested metadata describing digital entities, such as actors, calculations, or their quantifiable outcomes, allow for more context to exist about a data type within the market, which inherently have a relationship with credit pricing and can describe overall project effectiveness.

#### 4.52.1. Properties

A Tag’s properties will vary based on the implementation, for example using DIDs or Verified Credentials. An example tag might have the following properties:

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Id of the tag, see [§ 4.105 Data Type: Id](#dt-id) for details. |
| name : [String](#string) | String | M | Name of the tag as applied to the data type. |
| context : [String](#string) | Array | M | The contexts of the tag, similar to Json-LD, an array of strings. |
| description : [String](#string) | String | M | The description of the tag. |

*Properties of data type Attestation*

<a id="dt-mitigation-activity"></a>

### 4.53. Data Type: <a id="mitigationactivity"></a>MitigationActivity

The combination structure of the CCP MitigationActivity attribute.

#### 4.53.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-mitigationactivity-carboncategory"></a>`carbonCategory` : `[CarbonCategory](#enumdef-carboncategory)` | String | M | The activity of the project, see [§ 4.82 Data Type: CarbonCategory](#dt-carbon-category) for details. |
| <a id="element-attrdef-mitigationactivity-method"></a>`method` : `[Method](#enumdef-method)` | String | M | The method used by the project for its activities, see [§ 4.84 Data Type: Method](#dt-method) for details. |

*Properties of data type MitigationActivity*

<a id="dt-geographic-location"></a>

### 4.54. Data Type: <a id="geographiclocation"></a>GeographicLocation

The GeographicLocation is a data type that can represent a GNSS/GPS point location for projects like a facility or building and or a geographic area, like a land project using a polygon represented as a string or file. \*Either the longitude and latitude or the string or file for the area must have a value.

#### 4.54.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| id : [Id](#id) | String | M | Unique identifier for the GNSS, See [§ 4.105 Data Type: Id](#dt-id) for details. |
| <a id="element-attrdef-geographiclocation-latitude"></a>`latitude` : [Decimal](#decimal) | Decimal | O\* | The latitude of the location using Decimal Degrees. |
| <a id="element-attrdef-geographiclocation-longitude"></a>`longitude` : [Decimal](#decimal) | Decimal | O\* | The longitude of the location using Decimal Degrees. |
| <a id="element-attrdef-geographiclocation-geojsonorkml"></a>`geoJsonOrKml` : [String](#string) | String | O\* | The geoJson or KML as a minimized string of the geographic area. |
| <a id="element-attrdef-geographiclocation-geographiclocationfile"></a>`geographicLocationFile` : [VerifiedLink](#verifiedlink) | Object | O\* | The geographic location file, Geojson, KML, etc., for larger geographic data sets, see [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |

*Properties of data type GeographicLocation*

<a id="dt-quality-standard"></a>

### 4.55. Data Type <a id="qualitystandard"></a>QualityStandard

The QualityStandard is a set of properties that identify the accredited standard, a methodology and any versioning information for the validation and verification process.

#### 4.55.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| name : [String](#string) | String | M | Name of the quality standard, methodology or protocol, can include version information in the name. |
| description : [String](#string) | String | O | Description of the quality standard, can include differentiating information related to the project implementation. |
| standard : `[Standard](#enumdef-standard)` | String | M | The standard used for the quality standard. See [§ 4.97 Data Type: Standard](#dt-standard) for details. |
| methdologyAndTools : `[MethodologyAndTool](#enumdef-methodologyandtool)` | Array | M | A list of the methodology and any tools used for the quality standard. See [§ 4.98 Data Type: MethodologyAndTool](#dt-methodology-and-tool) for details. |
| version :[String](#string) | String | O | The version of the quality standard, methodology or protocol. |
| co-benefits : [Co-Benefit](#co-benefit) | Object | O | The co-benefits of the quality standard. See [§ 4.37 Data Type: Co-Benefit](#dt-co-benefit) for details. |
| standardLink : [VerifiedLink](#verifiedlink) | Object | M | The VerifiedLink to the standard. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |

*Properties of data type QualityStandard*

<a id="dt-mrv-requirements"></a>

### 4.56. Data Type <a id="mrvrequirements"></a>MRVRequirements

The MRVRequirements is a set of properties that identify the measurement specification, the precision of the measurement and the link to the specification. Here is where a Quality Standard can prescribe a set of Extensions to be used in the verification process.

#### 4.56.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| MeasurementSpecification : `[MeasurementSpecification](#enumdef-measurementspecification)` | String | M | A string representation of the measurement specification, see [§ 4.95 Data Type: MeasurementSpecification](#dt-measurement-specification) for details. |
| specificationLink : [VerifiedLink](#verifiedlink) | Object | M | The VerifiedLink to the specification. See [§ 4.42 Data Type: VerifiedLink](#dt-verified-link) for details. |
| precision : [PrecisionMix](#precisionmix) | Object | M | The precision of the measurement. See [§ 4.57 Data Type: PrecisionMix](#dt-precision-mix) for details. |
| claimPeriod : `[ClaimPeriod](#enumdef-claimperiod)` | String | M | The string representation of claim period for measurement and reporting. See [§ 4.87 Data Type: ClaimPeriod](#dt-claim-period) for details. |
| extensionSetId : [Id](#id) | String | M | A collection of extensions, called a set, used in the verification process, see [§ 4.15 Data Type: ExtensionSet](#dt-extension-set) for details. |

*Properties of data type MRVRequirements*

<a id="dt-precision-mix"></a>

### 4.57. Data Type: <a id="precisionmix"></a>PrecisionMix

The mix of precision, by percentage, of the measurement specification used for the project. The sum of all the mixes **must** be 100 for 100%.

#### 4.57.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| low : [Decimal](#decimal) | Decimal | M | The percentage of estimated or factored precision for the project. |
| medium : [Decimal](#decimal) | Decimal | M | The percentage of indirect high quality precision for the project. |
| high : [Decimal](#decimal) | Decimal | M | The percentage of direct highly accurate measurements for the project, i.e., from sensors. |

*Properties of data type PrecisionMix*

<a id="dt-date-range"></a>

### 4.58. Data Type: <a id="daterange"></a>DateRange

A date range contains a start and end date, with optional timestamps for precision.

#### 4.58.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-daterange-start"></a>`start` : [DatePoint](#datepoint) | DatePoint | M | The start date of the range. |
| <a id="element-attrdef-daterange-end"></a>`end` : [DatePoint](#datepoint) | DatePoint | M | The end date of the range. |

*Properties of the [DateRange](#daterange) data type.*

<a id="dt-date-point"></a>

### 4.59. Data Type: <a id="datepoint"></a>DatePoint

A DatePoint combines a date with an optional UTC Timestamp for precision if needed.

#### 4.59.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-datepoint-date"></a>`date` : [Date](#date) | Date | M | The date of the point. See [§ 4.61 Data Type: Date](#dt-date) for details. |
| <a id="element-attrdef-datepoint-timestamp"></a>`timestamp` : [Timestamp](#timestamp) | Timestamp | O | The UTC timestamp of the point. |

*Properties of the [DatePoint](#datepoint) data type.*

<a id="dt-date-string"></a>

### 4.60. Data Type: <a id="datestring"></a>DateString

A simple date string, i.e. "2023-01-01".

#### 4.60.1. Json Representation

Each DateString MUST be encoded as a JSON String.

<a id="dt-date"></a>

### 4.61. Data Type: <a id="date"></a>Date

Represents a date with discrete values for month, day and year.

#### 4.61.1. Properties

| Property | Type | Req | Specification |
| --- | --- | --- | --- |
| <a id="element-attrdef-date-datetime"></a>`dateTime` : [DateTime](#datetime) | String | O | The UTC date time, often used as DateTimeOffset, depending on the platform. |
| <a id="element-attrdef-date-datestring"></a>`dateString` : [String](#string) | String | M | Can be a simple date string, i.e. "2023-01-01". |

*Properties of data type Date*

### 4.62. Data Type: <a id="datetime"></a>DateTime

A DateTime is a date and time with an optional UTC Timestamp for precision if needed.

Example values:

-   `05/01/2023 12:00:00 AM`

-   `14/01/2023 12:00:00 PM`

#### 4.62.1. JSON Representation

Each DateTime MUST be encoded as a JSON String.

### 4.63. Data Type: <a id="timestamp"></a>Timestamp

A Timestamp is a number of milliseconds since the Unix epoch (1970-01-01T00:00:00Z).

Example values:

-   `1640995200000`

-   `1640995200010`

#### 4.63.1. JSON Representation

Each Timestamp MUST be encoded as a JSON String.

<a id="dt-itmo-id"></a>

### 4.64. Data Type: <a id="itmoid"></a>ITMOId

An ITMOId is a unique identifier for an Internationally Transferred Mitigation Outcome. It is a unique composite identifier made up of 6 parts, separated by a `-`.

Example:

-   `CA12-EU01-SP-1236500-2022-NIO`

The parts are:

-   `CA12` - Identifier of the cooperative approach assigned at authorization, cannot be changed once assigned

-   `EU01` - Identifier of the originating Party registry

-   `SP` - Identifier of the first transferring Party

-   `1236500` - Serial Number

-   `2022` - Vintage of the underlying mitigation outcome

-   `NIO` - Authorizations granted to the ITMO may change under certain circumstances to be defined by the CMA: N = NDC, I = International Mitigation Purposes, O = Other

#### 4.64.1. JSON Representation

Each ITMOId MUST be encoded as a JSON String.

<a id="dt-degradation-type"></a>

### 4.65. Data Type: <a id="enumdef-degradationtype"></a>`DegradationType`

Does the sequestration degrade over time?

**<a id="dom-degradationtype-not_applicable"></a>`NOT_APPLICABLE`**

the activity claim is not applicable to degradation.

**<a id="dom-degradationtype-linear"></a>`LINEAR`**

for activity claim is linear degradation

**<a id="dom-degradationtype-exponential"></a>`EXPONENTIAL`**

for activity claim is exponential degradation

#### 4.65.1. JSON Representation

Each DegredationType MUST be encoded as a JSON String.

<a id="dt-reversal-risk"></a>

### 4.66. Data Type: <a id="enumdef-reversalrisk"></a>`ReversalRisk`

Carbon sequestration reversal risk.

**<a id="dom-reversalrisk-zero"></a>`ZERO`**

GHG reservoirs are subject to zero risk if the form of carbon storage is such that stored CO2e cannot conceivably be released into the atmosphere. This also includes activity types with no storage, and thus no risk of reversal, e.g., Enhanced weathering of minerals, mineralization, renewable energy, other activities leading to lower demand for fossil fuel.

**<a id="dom-reversalrisk-low"></a>`LOW`**

GHG reservoirs might be subject to low risk of reversal if the characteristics of storage reservoirs (e.g., the geological formation in which carbon is to be stored,in the case of carbon capture and storage) and monitoring requirements virtually eliminate risk, e.g. Carbon capture and storage in geological formations, direct air capture and storage.

**<a id="dom-reversalrisk-material"></a>`MATERIAL`**

GHG reservoirs might be subject to significant reversal risks if: risks of reversal are exogenous and/or unavoidable (e.g., extreme weather events, invasive pest outbreaks, and wildfires); the GHG reservoir is subject to natural disturbance and natural fluxes in carbon inventories; reversal events may or can be expected to occur over a specified time horizon (100 years); a mitigation activity proponent could have economic interests in intentionally causing a reversal (for example cutting down a forest for timber or changing land use to agriculture), e.g. Improved forest management, afforestation/reforestation, enhanced soil organic carbon sequestration, Avoided deforestation, sequestration via harvested wood products (for example buildings)

#### 4.66.1. JSON Representation

Each ReversalRisk MUST be encoded as a JSON String.

<a id="dt-durability-insurance-type"></a>

### 4.67. Data Type: <a id="enumdef-durabilityinsurancetype"></a>`DurabilityInsuranceType`

Types of durability insurance for carbon removal credits.

**<a id="dom-durabilityinsurancetype-buffer_pool"></a>`BUFFER_POOL`**

an Accountable Impact Organization or insurance product can set aside credits into a pool for risk mitigation. If needed issued credits can be revoked and replaced by credits from the pool.

**<a id="dom-durabilityinsurancetype-refund"></a>`REFUND`**

purchase price of the credit is refunded to the buyer and the credit is revoked.

#### 4.67.1. JSON Representation

Each DurabilityInsuranceType MUST be encoded as a JSON String.

<a id="dt-insurance-policy-owner"></a>

### 4.68. Data Type: <a id="enumdef-insurancepolicyowner"></a>`InsurancePolicyOwner`

The owner of the durability insurance policy.

**<a id="dom-insurancepolicyowner-accountable_impact_organization"></a>`ACCOUNTABLE_IMPACT_ORGANIZATION`**

the Accountable Impact Organization is the owner of the insurance policy.

**<a id="dom-insurancepolicyowner-issuing_registry"></a>`ISSUING_REGISTRY`**

the issuing registry is the owner of the insurance policy.

**<a id="dom-insurancepolicyowner-retirer"></a>`RETIRER`**

the retirer is the owner of the insurance policy.

**<a id="dom-insurancepolicyowner-custodian"></a>`CUSTODIAN`**

the custodian is the owner of the insurance policy.

#### 4.68.1. JSON Representation

Each InsurancePolicyOwner MUST be encoded as a JSON String.

<a id="dt-extension-context"></a>

### 4.69. Data Type: <a id="enumdef-extensioncontext"></a>`ExtensionContext`

An Extension can be context specific and attach to the appropriate data type. Because there can be many Extensions defined for a Quality Standard and be applied to different data types, the Extension Type is used to identify the data type to which the Extension applies.

**<a id="dom-extensioncontext-unknown_context"></a>`UNKNOWN_CONTEXT`**

Unknown context

**<a id="dom-extensioncontext-accountable_impact_organization"></a>`ACCOUNTABLE_IMPACT_ORGANIZATION`**

Accountable Impact Organization context

**<a id="dom-extensioncontext-activity_impact_module"></a>`ACTIVITY_IMPACT_MODULE`**

Activity Impact Module context

**<a id="dom-extensioncontext-claim_source"></a>`CLAIM_SOURCE`**

Claim Source context

**<a id="dom-extensioncontext-impact_claim"></a>`IMPACT_CLAIM`**

Impact Claim context

**<a id="dom-extensioncontext-checkpoint"></a>`CHECKPOINT`**

Checkpoint context

**<a id="dom-extensioncontext-checkpoint_result"></a>`CHECKPOINT_RESULT`**

Checkpoint Result context

**<a id="dom-extensioncontext-data_package_manifest"></a>`DATA_PACKAGE_MANIFEST`**

Data Package Manifest context

**<a id="dom-extensioncontext-data_file"></a>`DATA_FILE`**

Data File context

**<a id="dom-extensioncontext-processed_claim"></a>`PROCESSED_CLAIM`**

Processed Claim context

**<a id="dom-extensioncontext-verification_process_agreement"></a>`VERIFICATION_PROCESS_AGREEMENT`**

Origination Process Agreement context

**<a id="dom-extensioncontext-claim_group"></a>`CLAIM_GROUP`**

Impact-Processed Claim Group context

**<a id="dom-extensioncontext-formula_template"></a>`FORMULA_TEMPLATE`**

Formula Template context

**<a id="dom-extensioncontext-formula"></a>`FORMULA`**

Formula context

**<a id="dom-extensioncontext-variable_template"></a>`VARIABLE_TEMPLATE`**

Variable Template context

**<a id="dom-extensioncontext-variable"></a>`VARIABLE`**

Variable context

**<a id="dom-extensioncontext-extension_set"></a>`EXTENSION_SET`**

Extension Set context

**<a id="dom-extensioncontext-extension_set_module"></a>`EXTENSION_SET_MODULE`**

Extension Set Module context

#### 4.69.1. JSON Representation

Each ExtensionContext MUST be encoded as a JSON String.

<a id="dt-checkpoint-result-status"></a>

### 4.70. Data Type: <a id="enumdef-checkpointresultstatus"></a>`CheckpointResultStatus`

The status of a Checkpoint Result.

**PENDING**

verification hasn’t begun

**IN\_PROGRESS**

verification has started

**EXCEPTION\_PROCESS**

an exception has been found and is being resolved with the Supplier via Messaging

**VERIFIED**

verification was complete

**REJECTED**

verification was rejected

#### 4.70.1. JSON Representation

Each CheckpointResultStatus MUST be encoded as a JSON String.<a id="dt-message-type"></a>

### 4.71. Data Type: <a id="enumdef-messagetype"></a>`MessageType`

The type of Extension message.

**<a id="dom-messagetype-request"></a>`REQUEST`**

for Request

**<a id="dom-messagetype-response"></a>`RESPONSE`**

for Response

#### 4.71.1. JSON Representation

Each MessageType MUST be encoded as a JSON String.

<a id="dt-data-file-type"></a>

### 4.72. Data Type: <a id="enumdef-filetype"></a>`FileType`

The file type indicates what data is contained within the file.

**<a id="dom-filetype-data_binary"></a>`DATA_BINARY`**

The file contains binary data.

**<a id="dom-filetype-data_csv"></a>`DATA_CSV`**

The file contains CSV data.

**<a id="dom-filetype-data_json"></a>`DATA_JSON`**

The file contains JSON data.

**<a id="dom-filetype-data_xml"></a>`DATA_XML`**

The file contains XML data.

**<a id="dom-filetype-data_avro"></a>`DATA_AVRO`**

The file is in Avro format.

**<a id="dom-filetype-data_other"></a>`DATA_OTHER`**

The file contains other data.

#### 4.72.1. JSON Representation

Each FileType MUST be encoded as a JSON String.

<a id="dt-hash-algorithm"></a>

### 4.73. Data Type: <a id="enumdef-hashalgorithm"></a>`HashAlgorithm`

The HashAlgorithm is a string enumeration that defines the cryptographic hash algorithm used to generate the hash of an external data element.

**<a id="dom-hashalgorithm-sha-256"></a>`SHA-256`**

The SHA-256 cryptographic hash algorithm.

**<a id="dom-hashalgorithm-sha3"></a>`SHA3`**

The SHA3 cryptographic hash algorithm.

#### 4.73.1. JSON Representation

Each HashAlgorithm MUST be encoded as a JSON String.

### 4.74. Data Type: <a id="enumdef-attestationtype"></a>`AttestationType`

Attestations can take the form of traditional PKI/JWT or Verified Credentials

**<a id="dom-attestationtype-rs256"></a>`RS256`**

JSON Web Token

**<a id="dom-attestationtype-vc"></a>`VC`**

Verified Credentials

#### 4.74.1. JSON Representation

Each AttestationType MUST be encoded as a JSON String.

<a id="dt-proof-type"></a>

### 4.75. Data Type: <a id="enumdef-prooftype"></a>`ProofType`

The type of attestation requested, supports two types: JWT, along with a ciphertype and Verified Credentials.

**<a id="dom-prooftype-jwt"></a>`JWT`**

Json Web Token

**<a id="dom-prooftype-dip"></a>`DIP`**

Data Integrity Proofs

**<a id="dom-prooftype-cl_zkp"></a>`CL_ZKP`**

Camenisch-Lysyanskaya Zero-Knowledge Proofs

#### 4.75.1. JSON Representation

Each ProofType MUST be encoded as a JSON String.

### 4.76. Data Type: <a id="enumdef-credentialtype"></a>`CredentialType`

The type of credential requested, supports three types: Verifiable Credentials, Verifiable Presentations, and Identity Credentials.

**<a id="dom-credentialtype-verifiable_credential"></a>`VERIFIABLE_CREDENTIAL`**

Verifiable Credentials

**<a id="dom-credentialtype-verifiable_presentation"></a>`VERIFIABLE_PRESENTATION`**

Verifiable Presentations

**<a id="dom-credentialtype-identity_credential"></a>`IDENTITY_CREDENTIAL`**

Identity Credentials

#### 4.76.1. JSON Representation

Each CredentialType MUST be encoded as a JSON String.

<a id="dt-signature-type"></a>

### 4.77. Data Type: <a id="enumdef-signaturetype"></a>`SignatureType`

The type of signature requested, supports two types: JSON Web Signature and Verified Credentials.

**<a id="dom-signaturetype-jws"></a>`JWS`**

JSON Web Signature

**<a id="dom-signaturetype-verified_credential"></a>`VERIFIED_CREDENTIAL`**

Verified Credentials

#### 4.77.1. JSON Representation

Each SignatureType MUST be encoded as a JSON String.

### 4.78. Data Type: <a id="enumdef-signatoryrole"></a>`SignatoryRole`

Role of the signatory for the Validation and Verification process.

**<a id="dom-signatoryrole-issuing_registry"></a>`ISSUING_REGISTRY`**

for Issuing Registry

**<a id="dom-signatoryrole-validation_and_verification_body"></a>`VALIDATION_AND_VERIFICATION_BODY`**

for Validation and Verification Body

**<a id="dom-signatoryrole-project_owner"></a>`PROJECT_OWNER`**

for Project Owner

**<a id="dom-signatoryrole-verification_platform_provider"></a>`VERIFICATION_PLATFORM_PROVIDER`**

for Verification Automation Provider

**<a id="dom-signatoryrole-accountable_impact_organization"></a>`ACCOUNTABLE_IMPACT_ORGANIZATION`**

for Accountable Impact Organization

**<a id="dom-signatoryrole-activity_impact_module"></a>`ACTIVITY_IMPACT_MODULE`**

for Activity Impact Module

#### 4.78.1. JSON Representation

Each SignatoryRole MUST be encoded as a JSON String.

<a id="dt-classification-category"></a>

### 4.79. Data Type: <a id="enumdef-classificationcategory"></a>`ClassificationCategory`

The ClassificationCategory is a string enumeration that defines the classification for the type of credit the project is seeking. This list will be expanded to include other categories, like biodiversity, in the future.

**<a id="dom-classificationcategory-carbon_avoidance"></a>`CARBON_AVOIDANCE`**

for Carbon Avoidance

**<a id="dom-classificationcategory-carbon_reduction"></a>`CARBON_REDUCTION`**

for Carbon Reduction

**<a id="dom-classificationcategory-carbon_removal"></a>`CARBON_REMOVAL`**

for Carbon Removal

**<a id="dom-classificationcategory-water"></a>`WATER`**

for Water

**<a id="dom-classificationcategory-undefined"></a>`UNDEFINED`**

for undefined

#### 4.79.1. JSON Representation

Each ClassificationCategory MUST be encoded as a JSON String.

<a id="dt-rec-type"></a>

### 4.80. Data Type: <a id="enumdef-rectype"></a>`RecType`

The REC Type is a string enumeration that defines the type of renewable energy credit or program used to generate the credit.

**<a id="dom-rectype-i_rec"></a>`I_REC`**

For International REC

**<a id="dom-rectype-us_rec"></a>`US_REC`**

For United States REC

**<a id="dom-rectype-us_s_rec"></a>`US_S_REC`**

For United States Solar REC

**<a id="dom-rectype-recs"></a>`RECS`**

For EU RECs

**Issue:** REC Types need to be completed

#### 4.80.1. JSON Representation

Each RecType MUST be encoded as a JSON String.

<a id="dt-generation-type"></a>

### 4.81. Data Type: <a id="enumdef-generationtype"></a>`GenerationType`

How the project generates the credits.

**<a id="dom-generationtype-generated"></a>`GENERATED`**

the credit was generated by evidence collected and verified by the project; verifier and registry

**<a id="dom-generationtype-ex_ante"></a>`EX_ANTE`**

the credit represents forecasted emissions reductions

**<a id="dom-generationtype-ex_post"></a>`EX_POST`**

the credit represents historical emissions reductions

#### 4.81.1. JSON Representation

Each GenerationType MUST be encoded as a JSON String.

<a id="dt-carbon-category"></a>

### 4.82. Data Type: <a id="enumdef-carboncategory"></a>`CarbonCategory`

The CarbonCategory is used by the Core Carbon Principles to indicate wether a credit is a reduction or a removal.

**<a id="dom-carboncategory-reduction"></a>`REDUCTION`**

for Carbon Reduction

**<a id="dom-carboncategory-removal"></a>`REMOVAL`**

for Carbon Removal

#### 4.82.1. JSON Representation

Each CarbonCategory MUST be encoded as a JSON String.

<a id="dt-claim-source-type"></a>

### 4.83. Data Type: <a id="enumdef-claimsourcetype"></a>`ClaimSourceType`

A ClaimSourceType is the source type for evidence in a claim that can include sensor, meter, application, reference, etc.

**<a id="dom-claimsourcetype-sensor_device"></a>`SENSOR_DEVICE`**

A sensor or meter that collects data to support a claim, e.g., IoT, meter, etc.

**<a id="dom-claimsourcetype-user_application"></a>`USER_APPLICATION`**

An application running on a device, iPad, etc. that uses the device’s sensors like GPS, date/time and user authentication as evidence of source claim data.

**<a id="dom-claimsourcetype-reference"></a>`REFERENCE`**

Reference data like factor library, satellite imagery, remote sensing, analytical models, etc.

**<a id="dom-claimsourcetype-calculated"></a>`CALCULATED`**

A calculated source, derived from other data.

**<a id="dom-claimsourcetype-document"></a>`DOCUMENT`**

A document source, i.e., PDD

**<a id="dom-claimsourcetype-other"></a>`OTHER`**

Other source type.

#### 4.83.1. JSON Representation

Each ClaimSourceType MUST be encoded as a JSON String.

<a id="dt-method"></a>

### 4.84. Data Type: <a id="enumdef-method"></a>`Method`

The method used by the project for its activities.

**<a id="dom-method-natural"></a>`NATURAL`**

for Natural or using Natural processes

**<a id="dom-method-technological"></a>`TECHNOLOGICAL`**

for Technological or engineered

**<a id="dom-method-both_natural_and_technological"></a>`BOTH_NATURAL_AND_TECHNOLOGICAL`**

for both Natural and Technological

#### 4.84.1. JSON Representation

Each Method MUST be encoded as a JSON String.

<a id="dt-storage"></a>

### 4.85. Data Type: <a id="enumdef-storage"></a>`Storage`

Storage is used by the Core Carbon Principles to indicate the storage type.

**<a id="dom-storage-biological"></a>`BIOLOGICAL`**

for biological carbon sequestration

**<a id="dom-storage-geological"></a>`GEOLOGICAL`**

for geological carbon sequestration

**<a id="dom-storage-materials"></a>`MATERIALS`**

for sequestration materials, i.e., in products, concrete, etc.

#### 4.85.1. JSON Representation

Each Storage MUST be encoded as a JSON String.

### 4.86. Data Type: <a id="enumdef-region"></a>`Region`

The region of the project.

**<a id="dom-region-global"></a>`GLOBAL`**

for Global

**<a id="dom-region-central_america"></a>`CENTRAL_AMERICA`**

for Central America

**<a id="dom-region-central_asia"></a>`CENTRAL_ASIA`**

for Central Asia

**<a id="dom-region-east_asia"></a>`EAST_ASIA`**

for East Asia

**<a id="dom-region-europe"></a>`EUROPE`**

for Europe

**<a id="dom-region-international"></a>`INTERNATIONAL`**

for International

**<a id="dom-region-middle_east"></a>`MIDDLE_EAST`**

for Middle East

**<a id="dom-region-north_africa"></a>`NORTH_AFRICA`**

for North Africa

**<a id="dom-region-north_america"></a>`NORTH_AMERICA`**

for North America

**<a id="dom-region-oceania"></a>`OCEANIA`**

for Oceania

**<a id="dom-region-south_america"></a>`SOUTH_AMERICA`**

for South America

**<a id="dom-region-south_asia"></a>`SOUTH_ASIA`**

for South Asia

**<a id="dom-region-south_east_asia"></a>`SOUTH_EAST_ASIA`**

for South East Asia

**<a id="dom-region-sub_saharan_africa"></a>`SUB_SAHARAN_AFRICA`**

for Sub-Saharan Africa

#### 4.86.1. JSON Representation

Each Region MUST be encoded as a JSON String.

<a id="dt-claim-period"></a>

### 4.87. Data Type: <a id="enumdef-claimperiod"></a>`ClaimPeriod`

Duration of the claim period.

**<a id="dom-claimperiod-daily"></a>`DAILY`**

for Daily

**<a id="dom-claimperiod-weekly"></a>`WEEKLY`**

for Weekly

**<a id="dom-claimperiod-monthly"></a>`MONTHLY`**

for Monthly

**<a id="dom-claimperiod-quarterly"></a>`QUARTERLY`**

for Quarterly

**<a id="dom-claimperiod-semiannual"></a>`SEMIANNUAL`**

for Semiannual

**<a id="dom-claimperiod-annual"></a>`ANNUAL`**

for Annual

**<a id="dom-claimperiod-biennial"></a>`BIENNIAL`**

for Biennial

#### 4.87.1. JSON Representation

Each ClaimPeriod MUST be encoded as a JSON String.

<a id="dt-project-scale"></a>

### 4.88. Data Type: <a id="enumdef-projectscale"></a>`ProjectScale`

The scale of the project.

**<a id="dom-projectscale-micro"></a>`MICRO`**

less than 1000 tCO2e

**<a id="dom-projectscale-small"></a>`SMALL`**

1000 - 10000 tCO2e

**<a id="dom-projectscale-medium"></a>`MEDIUM`**

10000 - 100000 tCO2e

**<a id="dom-projectscale-large"></a>`LARGE`**

100000 - 1000000 tCO2e

#### 4.88.1. JSON Representation

Each ProjectScale MUST be encoded as a JSON String.

<a id="dt-validation-step-status"></a>

### 4.89. Data Type: <a id="enumdef-validationstepstatus"></a>`ValidationStepStatus`

The status of the validation step.

**<a id="dom-validationstepstatus-unknown_validation_step_status"></a>`UNKNOWN_VALIDATION_STEP_STATUS`**

for Unknown status

**<a id="dom-validationstepstatus-not_started"></a>`NOT_STARTED`**

for Not Started

**<a id="dom-validationstepstatus-in_progress"></a>`IN_PROGRESS`**

for In Progress

**<a id="dom-validationstepstatus-completed"></a>`COMPLETED`**

for Completed

#### 4.89.1. JSON Representation

Each ValidationStepStatus MUST be encoded as a JSON String.

<a id="dt-address-type"></a>

### 4.90. Data Type: <a id="enumdef-addresstype"></a>`AddressType`

The type of the address.

**<a id="dom-addresstype-physical"></a>`PHYSICAL`**

for Physical Address

**<a id="dom-addresstype-legal"></a>`LEGAL`**

for Legal Address

**<a id="dom-addresstype-mailing"></a>`MAILING`**

for Mailing Address

#### 4.90.1. JSON Representation

Each AddressType MUST be encoded as a JSON String.

<a id="dt-audit-schedule"></a>

### 4.91. Data Type: <a id="enumdef-auditschedule"></a>`AuditSchedule`

The schedule of the audit.

**<a id="dom-auditschedule-annual"></a>`ANNUAL`**

for Annual Audits

**<a id="dom-auditschedule-biannual"></a>`BIANNUAL`**

for Biannual Audits

**<a id="dom-auditschedule-biennial"></a>`BIENNIAL`**

for Biennial Audits

**<a id="dom-auditschedule-triennial"></a>`TRIENNIAL`**

for Triennial Audits

**<a id="dom-auditschedule-quadrennial"></a>`QUADRENNIAL`**

for Quadrennial Audits

**<a id="dom-auditschedule-quinquennial"></a>`QUINQUENNIAL`**

for Quinquennial Audits

#### 4.91.1. JSON Representation

Each AuditSchedule MUST be encoded as a JSON String.

<a id="dt-un-sdgs"></a>

### 4.92. Data Type: <a id="enumdef-un-sdgs"></a>`UN-SDGs`

The UN SDGs are used in certain categories for entities as well as with Co-benefits that are usually attached to assets like voluntary carbon credits.

**<a id="dom-un-sdgs-no_category"></a>`NO_CATEGORY`**

for No Category

**<a id="dom-un-sdgs-no_poverty"></a>`NO_POVERTY`**

for No Poverty

**<a id="dom-un-sdgs-zero_hunger"></a>`ZERO_HUNGER`**

for Zero Hunger

**<a id="dom-un-sdgs-good_health_and_well_being"></a>`GOOD_HEALTH_AND_WELL_BEING`**

for Good Health and Well Being

**<a id="dom-un-sdgs-quality_education"></a>`QUALITY_EDUCATION`**

for Quality Education

**<a id="dom-un-sdgs-gender_equality"></a>`GENDER_EQUALITY`**

for Gender Equality

**<a id="dom-un-sdgs-clean_water_and_sanitation"></a>`CLEAN_WATER_AND_SANITATION`**

for Clean Water and Sanitation

**<a id="dom-un-sdgs-affordable_and_clean_energy"></a>`AFFORDABLE_AND_CLEAN_ENERGY`**

for Affordable and Clean Energy

**<a id="dom-un-sdgs-decent_work_and_economic_growth"></a>`DECENT_WORK_AND_ECONOMIC_GROWTH`**

for Decent Work and Economic Growth

**<a id="dom-un-sdgs-industry_innovation_and_infrastructure"></a>`INDUSTRY_INNOVATION_AND_INFRASTRUCTURE`**

for Industry Innovation and Infrastructure

**<a id="dom-un-sdgs-reduced_inequalities"></a>`REDUCED_INEQUALITIES`**

for Reduced Inequalities

**<a id="dom-un-sdgs-sustainable_cities_and_communities"></a>`SUSTAINABLE_CITIES_AND_COMMUNITIES`**

for Sustainable Cities and Communities

**<a id="dom-un-sdgs-responsible_consumption_and_production"></a>`RESPONSIBLE_CONSUMPTION_AND_PRODUCTION`**

for Responsible Consumption and Production

**<a id="dom-un-sdgs-climate_action"></a>`CLIMATE_ACTION`**

for Climate Action

**<a id="dom-un-sdgs-life_below_water"></a>`LIFE_BELOW_WATER`**

for Life Below Water

**<a id="dom-un-sdgs-life_on_land"></a>`LIFE_ON_LAND`**

for Life on Land

**<a id="dom-un-sdgs-peace_justice_and_strong_institutions"></a>`PEACE_JUSTICE_AND_STRONG_INSTITUTIONS`**

for Peace Justice and Strong Institutions

**<a id="dom-un-sdgs-partnerships_for_the_goals"></a>`PARTNERSHIPS_FOR_THE_GOALS`**

for Partnerships for the Goals

#### 4.92.1. JSON Representation

Each UN-SDGs MUST be encoded as a JSON String.

<a id="dt-project-scope"></a>

### 4.93. Data Type: <a id="enumdef-projectscope"></a>`ProjectScope`

Project scope helps classify projects.

**<a id="dom-projectscope-other"></a>`OTHER`**

for Other

**<a id="dom-projectscope-agriculture"></a>`AGRICULTURE`**

for Agriculture

**<a id="dom-projectscope-carbon_capture_and_storage"></a>`CARBON_CAPTURE_AND_STORAGE`**

for Carbon Capture and Storage

**<a id="dom-projectscope-chemical_processes"></a>`CHEMICAL_PROCESSES`**

for Chemical Processes

**<a id="dom-projectscope-forestry_and_land_use"></a>`FORESTRY_AND_LAND_USE`**

for Forestry and Land Use

**<a id="dom-projectscope-household_and_community"></a>`HOUSEHOLD_AND_COMMUNITY`**

for Household and Community

**<a id="dom-projectscope-industrial_manufacturing"></a>`INDUSTRIAL_MANUFACTURING`**

for Industrial Manufacturing

**<a id="dom-projectscope-renewable_energy"></a>`RENEWABLE_ENERGY`**

for Renewable Energy

**<a id="dom-projectscope-transportation"></a>`TRANSPORTATION`**

for Transportation

**<a id="dom-projectscope-waste_management"></a>`WASTE_MANAGEMENT`**

for Waste Management

#### 4.93.1. JSON Representation

Each ProjectScope MUST be encoded as a JSON String.

<a id="dt-project-type"></a>

### 4.94. Data Type: <a id="enumdef-projecttype"></a>`ProjectType`

Project Type helps to classify a project.

**<a id="dom-projecttype-advanced_refrigerants"></a>`ADVANCED_REFRIGERANTS`**

for Advanced Refrigerants

**<a id="dom-projecttype-afforestation_reforestation"></a>`AFFORESTATION_REFORESTATION`**

for Afforestation Reforestation

**<a id="dom-projecttype-aluminum_smelters_emission_reductions"></a>`ALUMINUM_SMELTERS_EMISSION_REDUCTIONS`**

for Aluminum Smelters Emission Reductions

**<a id="dom-projecttype-avoided_forest_conversion"></a>`AVOIDED_FOREST_CONVERSION`**

for Avoided Forest Conversion

**<a id="dom-projecttype-avoided_grassland_conversion"></a>`AVOIDED_GRASSLAND_CONVERSION`**

for Avoided Grassland Conversion

**<a id="dom-projecttype-bicycles"></a>`BICYCLES`**

for Bicycles

**<a id="dom-projecttype-biodigesters"></a>`BIODIGESTERS`**

for Biodigesters

**<a id="dom-projecttype-biomass"></a>`BIOMASS`**

for Biomass

**<a id="dom-projecttype-brick_manufacturing_emission_reductions"></a>`BRICK_MANUFACTURING_EMISSION_REDUCTIONS`**

for Brick Manufacturing Emission Reductions

**<a id="dom-projecttype-bundled_compost_production_and_soil_application"></a>`BUNDLED_COMPOST_PRODUCTION_AND_SOIL_APPLICATION`**

for Bundled Compost Production and Soil Application

**<a id="dom-projecttype-bundled_energy_efficiency"></a>`BUNDLED_ENERGY_EFFICIENCY`**

for Bundled Energy Efficiency

**<a id="dom-projecttype-carbon_capture_and_enhanced_oil_recovery"></a>`CARBON_CAPTURE_AND_ENHANCED_OIL_RECOVERY`**

for Carbon Capture and Enhanced Oil Recovery

**<a id="dom-projecttype-carbon_capture_and_storage"></a>`CARBON_CAPTURE_AND_STORAGE`**

for Carbon Capture and Storage

**<a id="dom-projecttype-carbon_capture_in_cement"></a>`CARBON_CAPTURE_IN_CEMENT`**

for Carbon Capture in Cement

**<a id="dom-projecttype-carbon_capture_in_plastic"></a>`CARBON_CAPTURE_IN_PLASTIC`**

for Carbon Capture in Plastic

**<a id="dom-projecttype-clean_water"></a>`CLEAN_WATER`**

for Clean Water

**<a id="dom-projecttype-community_boreholes"></a>`COMMUNITY_BOREHOLES`**

for Community Boreholes

**<a id="dom-projecttype-compost_addition_to_rangeland_soil"></a>`COMPOST_ADDITION_TO_RANGELAND_SOIL`**

for Compost Addition to Rangeland Soil

**<a id="dom-projecttype-composting"></a>`COMPOSTING`**

for Composting

**<a id="dom-projecttype-cookstoves"></a>`COOKSTOVES`**

for Cookstoves

**<a id="dom-projecttype-electric_vehicles_and_charging"></a>`ELECTRIC_VEHICLES_AND_CHARGING`**

for Electric Vehicles and Charging

**<a id="dom-projecttype-energy_efficiency"></a>`ENERGY_EFFICIENCY`**

for Energy Efficiency

**<a id="dom-projecttype-feed_additives"></a>`FEED_ADDITIVES`**

for Feed Additives

**<a id="dom-projecttype-fleet_efficiency"></a>`FLEET_EFFICIENCY`**

for Fleet Efficiency

**<a id="dom-projecttype-fuel_switching"></a>`FUEL_SWITCHING`**

for Fuel Switching

**<a id="dom-projecttype-fuel_transport"></a>`FUEL_TRANSPORT`**

**for Fuel Transport**

**<a id="dom-projecttype-geothermal"></a>`GEOTHERMAL`**

for Geothermal

**<a id="dom-projecttype-grid_expansion_and_mini_grids"></a>`GRID_EXPANSION_AND_MINI_GRIDS`**

for Grid Expansion and Mini Grids

**<a id="dom-projecttype-hfc_refrigerant_reclamation"></a>`HFC_REFRIGERANT_RECLAMATION`**

for HFC Refrigerant Reclamation

**<a id="dom-projecttype-hfc_replacement_in_foam_production"></a>`HFC_REPLACEMENT_IN_FOAM_PRODUCTION`**

for HFC Replacement in Foam Production

**<a id="dom-projecttype-hfc23_destruction"></a>`HFC23_DESTRUCTION`**

for HFC23 Destruction

**<a id="dom-projecttype-hydropower"></a>`HYDROPOWER`**

for Hydropower

**<a id="dom-projecttype-improved_forest_management"></a>`IMPROVED_FOREST_MANAGEMENT`**

for Improved Forest Management

**<a id="dom-projecttype-improved_irrigation_management"></a>`IMPROVED_IRRIGATION_MANAGEMENT`**

for Improved Irrigation Management

**<a id="dom-projecttype-landfill_methane"></a>`LANDFILL_METHANE`**

for Landfill Methane

**<a id="dom-projecttype-leak_detection_and_repair_in_gas_systems"></a>`LEAK_DETECTION_AND_REPAIR_IN_GAS_SYSTEMS`**

for Leak Detection and Repair in Gas Systems

**<a id="dom-projecttype-lighting"></a>`LIGHTING`**

for Lighting

**<a id="dom-projecttype-manure_methane_digester"></a>`MANURE_METHANE_DIGESTER`**

for Manure Methane Digester

**<a id="dom-projecttype-mass_transit"></a>`MASS_TRANSIT`**

for Mass Transit

**<a id="dom-projecttype-methane_recovery_in_wastewater"></a>`METHANE_RECOVERY_IN_WASTEWATER`**

for Methane Recovery in Wastewater

**<a id="dom-projecttype-mine_methane_capture"></a>`MINE_METHANE_CAPTURE`**

for Mine Methane Capture

**<a id="dom-projecttype-mineralization"></a>`MINERALIZATION`**

for Mineralization

**<a id="dom-projecttype-n20_destruction_in_adipic_acid_production"></a>`N20_DESTRUCTION_IN_ADIPIC_ACID_PRODUCTION`**

for N20 Destruction in Adipic Acid Production

**<a id="dom-projecttype-n20_destruction_in_nitric_acid_production"></a>`N20_DESTRUCTION_IN_NITRIC_ACID_PRODUCTION`**

for N20 Destruction in Nitric Acid Production

**<a id="dom-projecttype-natural_gas_electricity_generation"></a>`NATURAL_GAS_ELECTRICITY_GENERATION`**

for Natural Gas Electricy Generation

**<a id="dom-projecttype-nitrogen_management"></a>`NITROGEN_MANAGEMENT`**

for Nitrogen Management

**<a id="dom-projecttype-oil_recycling"></a>`OIL_RECYCLING`**

for Oil Recycling

**<a id="dom-projecttype-ozone_depleting_substances_recovery_and_destruction"></a>`OZONE_DEPLETING_SUBSTANCES_RECOVERY_AND_DESTRUCTION`**

for Ozone Depleting Substances Recovery and Destruction

**<a id="dom-projecttype-pneumatic_retrofit"></a>`PNEUMATIC_RETROFIT`**

for Pneumatic Retrofit

**<a id="dom-projecttype-propylene_oxide_production"></a>`PROPYLENE_OXIDE_PRODUCTION`**

for Propylene Oxide Production

**<a id="dom-projecttype-re_bundled"></a>`RE_BUNDLED`**

for Re-Bundled

**<a id="dom-projecttype-redd_plus"></a>`REDD_PLUS`**

for REDD+

**<a id="dom-projecttype-refrigerant_leak_detection"></a>`REFRIGERANT_LEAK_DETECTION`**

for Refrigerant Leak Detection

**<a id="dom-projecttype-rice_emission_reductions"></a>`RICE_EMISSION_REDUCTIONS`**

for Rice Emission Reductions

**<a id="dom-projecttype-sf6_replacement"></a>`SF6_REPLACEMENT`**

for SF6 Replacement

**<a id="dom-projecttype-shipping"></a>`SHIPPING`**

for Shipping

**<a id="dom-projecttype-solar_centralized"></a>`SOLAR_CENTRALIZED`**

for Solar Centralized

**<a id="dom-projecttype-solar_distributed"></a>`SOLAR_DISTRIBUTED`**

for Solar Distributed

**<a id="dom-projecttype-solar_lighting"></a>`SOLAR_LIGHTING`**

for Solar Lighting

**<a id="dom-projecttype-solar_water_heaters"></a>`SOLAR_WATER_HEATERS`**

for Solar Water Heaters

**<a id="dom-projecttype-solid_waste_separation"></a>`SOLID_WASTE_SEPARATION`**

for Solid Waste Separation

**<a id="dom-projecttype-sustainable_agriculture"></a>`SUSTAINABLE_AGRICULTURE`**

for Sustainable Agriculture

**<a id="dom-projecttype-sustainable_grassland_management"></a>`SUSTAINABLE_GRASSLAND_MANAGEMENT`**

for Sustainable Grassland Management

**<a id="dom-projecttype-truck_stop_electrification"></a>`TRUCK_STOP_ELECTRIFICATION`**

for Truck Stop Electrification

**<a id="dom-projecttype-university_campus_emission_reductions"></a>`UNIVERSITY_CAMPUS_EMISSION_REDUCTIONS`**

for University Campus Emission Reductions

**<a id="dom-projecttype-waste_diversion"></a>`WASTE_DIVERSION`**

for Waste Diversion

**<a id="dom-projecttype-waste_gas_recovery"></a>`WASTE_GAS_RECOVERY`**

for Waste Gas Recovery

**<a id="dom-projecttype-waste_heat_recovery"></a>`WASTE_HEAT_RECOVERY`**

for Waste Heat Recovery

**<a id="dom-projecttype-waste_incineration"></a>`WASTE_INCINERATION`**

for Waste Incineration

**<a id="dom-projecttype-waste_recycling"></a>`WASTE_RECYCLING`**

for Waste Recycling

**<a id="dom-projecttype-weatherization"></a>`WEATHERIZATION`**

for Weatherization

**<a id="dom-projecttype-wetland_restoration"></a>`WETLAND_RESTORATION`**

for Wetland Restoration

**<a id="dom-projecttype-wind"></a>`WIND`**

for Wind

**<a id="dom-projecttype-biochar"></a>`BIOCHAR`**

for Biochar

**<a id="dom-projecttype-carbonated_materials"></a>`CARBONATED_MATERIALS`**

for Carbonated Materials

**<a id="dom-projecttype-carbon_capture_in_geological_storage"></a>`CARBON_CAPTURE_IN_GEOLOGICAL_STORAGE`**

for Carbon Capture in Geological Storage

**<a id="dom-projecttype-enhanced_rock_weathering"></a>`ENHANCED_ROCK_WEATHERING`**

for Enhanced Rock Weathering

**<a id="dom-projecttype-terrestrial_storage_of_biomass"></a>`TERRESTRIAL_STORAGE_OF_BIOMASS`**

for Terrestrial Storage of Biomass

#### 4.94.1. JSON Representation

Each ProjectType is represented as a string in JSON.

<a id="dt-measurement-specification"></a>

### 4.95. Data Type: <a id="enumdef-measurementspecification"></a>`MeasurementSpecification`

The MRV measurement specification used.

**<a id="dom-measurementspecification-iso_14064"></a>`ISO_14064`**

for ISO 14064

**<a id="dom-measurementspecification-iso_14064_1"></a>`ISO_14064_1`**

for ISO 14064-1

**<a id="dom-measurementspecification-iso_14064_2"></a>`ISO_14064_2`**

for ISO 14064-2

#### 4.95.1. JSON Representation

Each MeasurementSpecification is represented as a string in JSON.

<a id="dt-credit-status"></a>

### 4.96. Data Type: <a id="enumdef-creditstatus"></a>`CreditStatus`

A status indicator used for credits.

**<a id="dom-creditstatus-active"></a>`ACTIVE`**

for Active

**<a id="dom-creditstatus-inactive"></a>`INACTIVE`**

for Inactive

**<a id="dom-creditstatus-revoked"></a>`REVOKED`**

for Revoked

**<a id="dom-creditstatus-retired"></a>`RETIRED`**

for Retired

#### 4.96.1. JSON Representation

Each CreditStatus is represented as a string in JSON.

<a id="dt-standard"></a>

### 4.97. Data Type: <a id="enumdef-standard"></a>`Standard`

The list of Quality Standard, e.g., methodology or protocols.

**<a id="dom-standard-gs_ver"></a>`GS_VER`**

for Gold Standard Verified Emissions Reduction

**<a id="dom-standard-vcs"></a>`VCS`**

for Certified Carbon Standard generates VCUs

**<a id="dom-standard-vos"></a>`VOS`**

for Voluntary Offset Standard

**<a id="dom-standard-ccb"></a>`CCB`**

for Climate

**<a id="dom-standard-green_e"></a>`GREEN_E`**

for US renewable energy

**<a id="dom-standard-cdm"></a>`CDM`**

for Compliance: Clean Development Mechanism generates CERs

**<a id="dom-standard-ji"></a>`JI`**

for Compliance: Joint Implementation - Kyoto binding targets generation of ERUs

**<a id="dom-standard-eua"></a>`EUA`**

for Compliance: European Union Allowances

**<a id="dom-standard-puro"></a>`PURO`**

for Puro Standard verified durable carbon removal

**<a id="dom-standard-pending"></a>`PENDING`**

for Other or in Development

#### 4.97.1. JSON Representation

Each Standard is represented as a string in JSON.

<a id="dt-methodology-and-tool"></a>

### 4.98. Data Type: <a id="enumdef-methodologyandtool"></a>`MethodologyAndTool`

Each Quality Standard defined in the [OriginationProcessAgreement](#originationprocessagreement)(#dt-origination-process-agreement) is has a Methodology and might also have multiple toolkits for Additionality, Leakage, and Baseline, etc. This is not an exhaustive list of Methodologies and Tools as there can be hundreds of them.

**<a id="dom-methodologyandtool-cdm---am0007"></a>`CDM - AM0007`**

for CDM - AM0007

**<a id="dom-methodologyandtool-cdm---am0010"></a>`CDM - AM0010`**

for CDM - AM0010

#### 4.98.1. JSON Representation

Each MethodologyAndTool is represented as a string in JSON.

<a id="dt-corresponding-adjustment"></a>

### 4.99. Data Type: <a id="enumdef-correspondingadjustment"></a>`CorrespondingAdjustment`

A credits corresponding adjustment status.

**<a id="dom-correspondingadjustment-none"></a>`NONE`**

for there is no Corresponding adjustment associated with this credit. Meaning the country of origin for the credit will not subtract the credit from their Nationally Determined Contributions (NDCs)if the credit is exported and consumed in a different country.

**<a id="dom-correspondingadjustment-paris_agreement_compliant"></a>`PARIS_AGREEMENT_COMPLIANT`**

for there is verified Corresponding adjustment associated with this credit. Meaning the country of origin for the credit will not count the credit in their Nationally Determined Contributions (NDCs)so the credit can be exported and count in a different country’s NDC.

**<a id="dom-correspondingadjustment-paris_agreement_pending_compliance"></a>`PARIS_AGREEMENT_PENDING_COMPLIANCE`**

for there is corresponding adjustment associated with this credit; that is pending verification. Meaning the country of origin for the credit will not count the credit in their Nationally Determined Contributions (NDCs)so the credit can be exported and count in a different country’s NDC.

#### 4.99.1. JSON Representation

Each CorrespondingAdjustment is represented as a string in JSON.

<a id="dt-reporting-frequency"></a>

### 4.100. Data Type: <a id="enumdef-reportingfrequency"></a>`ReportingFrequency`

Reporting Frequency is the enumeration of the frequency that a claim source reports data.

**<a id="dom-reportingfrequency-sub_hourly"></a>`SUB_HOURLY`**

can report in intervals less than an hour

**<a id="dom-reportingfrequency-hourly"></a>`HOURLY`**

can report hourly

**<a id="dom-reportingfrequency-daily"></a>`DAILY`**

can report daily

**<a id="dom-reportingfrequency-sub_weekly"></a>`SUB_WEEKLY`**

can report in intervals less than a week

**<a id="dom-reportingfrequency-weekly"></a>`WEEKLY`**

can report weekly

**<a id="dom-reportingfrequency-sub_monthly"></a>`SUB_MONTHLY`**

can report in intervals less than a month

**<a id="dom-reportingfrequency-monthly"></a>`MONTHLY`**

can report monthly

#### 4.100.1. JSON Representation

The value of each `[ReportingFrequency](#enumdef-reportingfrequency)` MUST be encoded as a JSON String.

<a id="dt-unit"></a>

### 4.101. Data Type: <a id="enumdef-unitofmeasure"></a>`UnitOfMeasure`

UnitOfMeasure is the enumeration of accepted declared units with values

**<a id="dom-unitofmeasure-liter"></a>`liter`**

for unit liter

**<a id="dom-unitofmeasure-kilogram"></a>`kilogram`**

for unit kilogram

**<a id="dom-unitofmeasure-cubic-meter"></a>`cubic meter`**

for cubic meter

**<a id="dom-unitofmeasure-kilowatt"></a>`kilowatt`**

for kilowatt

**<a id="dom-unitofmeasure-megawatt"></a>`megawatt`**

for megawatt

**<a id="dom-unitofmeasure-megajoule"></a>`megajoule`**

for megajoule

**<a id="dom-unitofmeasure-ton-kilometer"></a>`ton kilometer`**

for ton kilometer

**<a id="dom-unitofmeasure-square-meter"></a>`square meter`**

for square meter

**<a id="dom-unitofmeasure-tonne_co2e"></a>`TONNE_CO2E`**

for tonne of CO2e

**<a id="dom-unitofmeasure-tonne_co2"></a>`TONNE_CO2`**

for tonne of CO2

**<a id="dom-unitofmeasure-tonne_ch4"></a>`TONNE_CH4`**

for tonne of CH4

**<a id="dom-unitofmeasure-tonne_n2o"></a>`TONNE_N2O`**

for tonne of N2O

**<a id="dom-unitofmeasure-mwh"></a>`MwH`**

for megawatt hour

#### 4.101.1. JSON Representation

The value of each `[UnitOfMeasure](#enumdef-unitofmeasure)` MUST be encoded as a JSON String.

### 4.102. Data Type: <a id="wholenumber"></a>WholeNumber

A whole number, may be signed, positive or negative.

Example values:

-   `10`

-   `42`

-   `-182`

#### 4.102.1. JSON Representation

Each whole number MUST be encoded as a JSON String.

### 4.103. Data Type: <a id="decimal"></a>Decimal

A dotted-decimal number.

Example values:

-   `10`

-   `42.12`

-   `-182.84`

#### 4.103.1. JSON Representation

Each Decimal MUST be encoded as a JSON String.

### 4.104. Data Type: <a id="string"></a>String

A regular UTF-8 String.

<a id="dt-string-json"></a>

#### 4.104.1. JSON Data Representation

Each [String](#string) MUST be encoded as a JSON String.

<a id="dt-id"></a>

### 4.105. Data Type: <a id="id"></a>Id

A Id MUST either be a UUID v4 as specified in [\[rfc9562\]](#biblio-rfc9562 "Universally Unique IDentifiers (UUIDs)").

or a unique key that can be represented as a string.

#### 4.105.1. JSON Representation

Each Id MUST be encoded as a JSON String, see [§ 4.104.1 JSON Data Representation](#dt-string-json) for details.

Example JSON string value:

```json
"f4b1225a-bd44-4c8e-861d-079e4e1dfd69"
```

<a id="dt-iso3166cc"></a>

### 4.106. Data Type: <a id="iso3166cc"></a>ISO3166CC

An ISO 3166-2 alpha-2 country code.

Example value for tue alpha-2 country code of the United States:

`US`

#### 4.106.1. JSON Representation

Each [ISO3166CC](#iso3166cc) MUST be encoded as a JSON String.
