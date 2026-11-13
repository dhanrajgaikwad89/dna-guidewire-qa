// Original QA study scenarios with official concept references. Existing lesson IDs are preserved.
const GUIDEWIRE_CONCEPTS = {
  "claimcenter": [
    {
      "title": "Draft claims, submission & cancellation",
      "intro": "A saved draft and an open claim represent different stages of readiness, even when the claim wizard makes the transition look seamless.",
      "points": [
        "A draft preserves incomplete loss information before adjudication. In the documented base behavior, it has not yet been assigned to an adjuster; submission opens the claim once the required information is valid.",
        "Test saving incomplete input, returning to the draft, correcting validation issues and submitting once. Record identifiers before and after submission without assuming a particular claim-number prefix.",
        "Cancellation of a draft is different from closing an established claim. Check that cancellation is offered only in supported states and that a repeated submit cannot create two open claims."
      ],
      "q": "How would you distinguish draft-save testing from claim-submission testing?",
      "a": "I would verify persistence and recoverability for a draft, then separately verify submission validation, state and assignment. My negative cases would include missing reporter information and repeated submission. I would also confirm that cancelling a draft does not behave like closing an open claim.",
      "practice": "Create a state table for save, edit, submit and cancel, including one prohibited transition.",
      "source": [
        "Guidewire · Draft and open claims",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/01-executing-FNOL/c_the-FNOL-process-in-ClaimCenter.html"
      ]
    },
    {
      "title": "Verified policies & claim policy snapshots",
      "intro": "ClaimCenter uses a claim-specific copy of policy information. Understanding its provenance helps explain coverage and integration defects.",
      "points": [
        "A verified policy copy originates from the policy administration system. An unverified policy can initially contain information supplied during loss reporting when authoritative policy information is unavailable.",
        "A claim-specific copy is not simply a live view of every future policy change. Test the project’s supported retrieval and refresh behavior, including policy term and loss-date selection.",
        "For an unverified policy, test the path to authoritative verification and restrictions on financial processing. Compare the policy number, insured, risks and coverage values before and after refresh."
      ],
      "q": "Why should a tester inspect the policy copy on the claim?",
      "a": "I would inspect it because correct data in the policy system does not prove the claim received the right version. I would compare identifiers, term dates and relevant coverage values, then trace retrieval or refresh. I would distinguish missing verification from a genuine coverage decision.",
      "practice": "Prepare a comparison sheet for two claims on the same policy with different loss dates.",
      "source": [
        "Guidewire · Verified and unverified policies",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/01-executing-FNOL/c_the-FNOL-process-in-ClaimCenter.html"
      ]
    },
    {
      "title": "Validation levels & business readiness",
      "intro": "A record can be saved successfully yet still lack the information needed for assignment or payment.",
      "points": [
        "Validation levels express readiness for different business operations. The documented base model includes new-loss completion and ability-to-pay checks; actual rules must be confirmed for the implementation.",
        "A claim and its exposures can have different readiness. Build cases that isolate a missing claim-level requirement from a missing exposure-level requirement before attempting a financial operation.",
        "Verify the error identifies the relevant field or object, correction removes the intended issue, and a later edit cannot silently violate a previously required condition."
      ],
      "q": "A claim exists but a payment is blocked. What do you check first?",
      "a": "I would inspect both claim and exposure validation results rather than assuming creation made them payable. I would identify the unmet rule, correct only that input and retry the permitted action. I would retain the validation issue and expected business rule in the test evidence.",
      "practice": "Design one claim-level and one exposure-level negative test for readiness to pay.",
      "source": [
        "Guidewire · Claim validation levels",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/02-claims/c_validating-claims.html"
      ]
    },
    {
      "title": "ClaimContact roles & role ownership",
      "intro": "The same person can participate in a loss in different ways. A role must identify both the contact and the object it relates to.",
      "points": [
        "A ClaimContact role describes a relationship such as reporter, claimant or driver. A role owner can be the claim or a related object, so the role name alone is insufficient to identify the relationship.",
        "Cloud API distinguishes reserved roles managed through related-object fields from editable non-reserved roles. Test through the supported contract instead of writing directly into a read-only roles collection.",
        "Use two vehicles or exposures and one shared contact to test role scoping. Replacing a reporter must not unintentionally remove a separate driver or claimant relationship."
      ],
      "q": "How would you test one contact holding several claim roles?",
      "a": "I would identify each role’s owner and its cardinality rules, then add and remove roles independently. I would verify the contact retains unrelated roles and that restricted or single-owner relationships are enforced. I would also check that the UI and API describe the same associations.",
      "practice": "Draw a contact-to-role-to-owner map for a reporter who is also the insured driver.",
      "source": [
        "Guidewire · ClaimContact roles",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/03-ClaimContacts/c_claimcontact_roles.html"
      ]
    },
    {
      "title": "Policy contacts & identifier mapping",
      "intro": "Cross-system contact identifiers are a frequent source of incorrect claimant and reporter links.",
      "points": [
        "A contact copied from a policy can have both a ClaimCenter identifier and a policy-system identifier. These values serve different contexts and should not be treated as interchangeable strings.",
        "During initial claim creation, a policy contact may be referenced before its ClaimCenter copy exists. Verify the integration resolves the correct source contact and creates the intended relationship.",
        "Test two contacts with the same display name but different identifiers, an unknown source identifier and a later contact refresh. Check identity using stable keys rather than screen text alone."
      ],
      "q": "How do you investigate a claim linked to the wrong insured contact?",
      "a": "I would compare the source policy contact key, the created ClaimContact key and the role relationship. Matching names are not enough. I would locate the first incorrect mapping and retest with duplicate names so the fix cannot depend on display text.",
      "practice": "Create a mapping table for three source contacts, including two with identical names.",
      "source": [
        "Guidewire · Contacts from the policy",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/03-ClaimContacts/c_working_with_contacts_on_the_policy.html"
      ]
    },
    {
      "title": "Vendor contacts & ContactManager",
      "intro": "A repairer or medical provider may originate in the shared contact system before participating in a particular claim.",
      "points": [
        "ContactManager can supply vendor contacts to ClaimCenter. A vendor’s shared identity and its claim-specific roles need separate verification, especially when the same provider serves several claims.",
        "Test an existing vendor selection, a missing vendor and changes to relevant contact details using the supported synchronization process. Confirm which system owns each field before expecting updates to flow both ways.",
        "Validate that the chosen provider is attached to the correct service request and claim. Include similar vendor names, inactive or ineligible providers where configured, and unavailable contact-service responses."
      ],
      "q": "What would you test when a vendor is selected from ContactManager?",
      "a": "I would verify the external identifier, relevant contact fields and resulting claim role. I would check the supported synchronization direction and ensure one claim’s association does not alter another claim’s vendor unexpectedly. A provider-name match alone would not be sufficient evidence.",
      "practice": "Write three tests for selecting a repair shop, including a duplicate-name scenario.",
      "source": [
        "Guidewire · Vendor contacts",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/03-ClaimContacts/c_copying_vendor_contacts_from_ContactManager.html"
      ]
    },
    {
      "title": "Incidents & damaged-object modeling",
      "intro": "An incident captures the damaged item or injury. This is distinct from the financial exposure associated with it.",
      "points": [
        "A single event can produce several incidents, such as damage to two vehicles and an injury. Choose an incident type that fits the loss and verify the fields appropriate to that type.",
        "The incident describes what happened to an item or person; an exposure tracks the potential payment obligation. Test the relationship without assuming one incident always means exactly one exposure.",
        "Check that editing one incident leaves other incidents unchanged. Include missing required details, unsupported type combinations and incorrect cross-claim references in API or integration coverage."
      ],
      "q": "How is an incident different from an exposure?",
      "a": "An incident describes the damaged property or injured person; an exposure organizes a potential payment associated with coverage and a claimant. I would test both the descriptive data and the relationship so the right loss is connected to the right financial obligation.",
      "practice": "Model a collision involving two vehicles and one injury, then map the required exposures.",
      "source": [
        "Guidewire · Incidents",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/04-incidents/c_overview-of-incidents-in-ClaimCenter.html"
      ]
    },
    {
      "title": "Injury incidents & medical information",
      "intro": "Injury data requires precise relationships and careful handling of sensitive information in test evidence.",
      "points": [
        "An injury incident records information about an injured person. Where medical diagnoses or bodily-injury details are supported, verify their association and the allowed values for the selected configuration.",
        "Test multiple injured parties on one claim and confirm updates remain attached to the intended person. Include unknown values, changed diagnoses and invalid combinations agreed with the business analyst.",
        "Use synthetic medical data in test environments. Verify authorized access, field masking where configured and that screenshots, exports and logs do not expose more information than intended."
      ],
      "q": "How would you test two injured people on the same claim?",
      "a": "I would create distinguishable synthetic injury data for each person, verify the related incidents and exposures, then update only one record. I would check the other person’s data remains unchanged and test a role that must not view the sensitive details.",
      "practice": "Design a synthetic dataset for two injuries with clearly different diagnosis and contact identifiers.",
      "source": [
        "Guidewire · Injury incidents",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/04-incidents/c_injury-incidents.html"
      ]
    },
    {
      "title": "Vehicle incidents & damage details",
      "intro": "Vehicle claims require consistent identification across policy risks, incident details and repair-related processing.",
      "points": [
        "A vehicle incident contains information about the vehicle involved in the loss. Verify identifiers and characteristics against the intended vehicle, rather than relying on the order of vehicles shown on screen.",
        "Where damage-point functionality is used, test the selection, persistence and display of damage locations. Include multiple vehicles so an edit to one cannot incorrectly update another.",
        "Check drivers, passengers, ownership and relevant service-request links according to the configured workflow. Test unknown vehicle details without assuming every vehicle involved must be insured on the policy."
      ],
      "q": "How would you prevent a test from confusing two damaged vehicles?",
      "a": "I would identify each vehicle using stable, distinct test data and scope interactions to that vehicle’s record. I would verify the incident identifier and linked contacts, then compare persisted damage details. I would include a third-party vehicle to avoid assuming all vehicles come from policy risks.",
      "practice": "Build a two-vehicle test with different damage locations and repair providers.",
      "source": [
        "Guidewire · Vehicle incidents",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/04-incidents/c_vehicle-incidents.html"
      ]
    },
    {
      "title": "Exposure ownership & specialist handling",
      "intro": "An exposure can require a different specialist from the person managing the overall claim.",
      "points": [
        "Exposure assignment identifies the team and user responsible for that portion of the claim. Confirm whether assignment follows the claim owner, an automated rule or a supported manual selection.",
        "Test a multi-exposure claim where property damage and injury work go to different users. Reassignment of one exposure should not unexpectedly change the other exposure or the overall claim owner.",
        "Include invalid group-user combinations and a user who cannot perform reassignment. Verify workload visibility and history against the project’s assignment rules and access model."
      ],
      "q": "Why test exposure assignment separately from claim assignment?",
      "a": "The claim can have several payment obligations requiring different expertise. I would verify each exposure’s owner and permitted operations separately, then check that claim-level reassignment has only the effects specified by the project. This prevents a broad assignment assertion from missing a misrouted exposure.",
      "practice": "Create an ownership matrix for one claim with property and injury exposures.",
      "source": [
        "Guidewire · Exposure assignment",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/05-exposures/c_assigning-exposures.html"
      ]
    },
    {
      "title": "Deductibles & coverage-linked validation",
      "intro": "A deductible affects the insured’s share of a covered loss, and its handling must follow the coverage terms and configured process.",
      "points": [
        "Verify that the exposure points to the appropriate policy coverage so deductible information can be determined correctly. A correct amount on the wrong coverage is still a data defect.",
        "Use approved examples to test a loss below, equal to and above the deductible. Distinguish calculation of the insured’s share from how a deductible is collected or reflected in a payment.",
        "For multiple payments or exposures, check the agreed remaining-deductible behavior and prevent unintended repeated application. Include currency precision and changes to relevant source coverage data."
      ],
      "q": "How would you test deductible handling across multiple payments?",
      "a": "I would establish the correct coverage and deductible, calculate the expected outcome independently, then make controlled partial payments. I would compare the total application across the sequence and check the remaining amount under the project rules. I would not assume each payment should deduct the full amount again.",
      "practice": "Prepare expected results for three losses around a deductible of 500 using an approved handling model.",
      "source": [
        "Guidewire · Deductibles",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/05-exposures/c_deductibles.html"
      ]
    },
    {
      "title": "Claim assignment rules & reassignment",
      "intro": "Assignment turns a reported loss into accountable work for the right group and adjuster.",
      "points": [
        "ClaimCenter supports assignment operations, while the actual routing logic belongs to the insurer’s rules. Typical test dimensions can include loss type, geography, workload and specialist skill where used.",
        "Build a decision table with one expected group and user outcome per case. Include a supported fallback when no preferred candidate is available instead of assuming assignment always succeeds.",
        "For manual reassignment, verify permissions, the new owner’s visibility and history. Check whether existing activities follow the change or retain their owners according to the agreed requirements."
      ],
      "q": "How would you prove an assignment rule is correct?",
      "a": "I would test each decision-table branch with controlled claim attributes and a known eligible user set. I would verify the persisted owner, not merely a success message, and include the no-match and unauthorized-reassignment cases. I would separately check any expected effect on related activities.",
      "practice": "Design four assignment-rule cases with one boundary and one no-match scenario.",
      "source": [
        "Guidewire · Claim assignment",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/02-claims/c_assigning-claims.html"
      ]
    },
    {
      "title": "Activity patterns, due dates & completion",
      "intro": "Activities turn claim-handling requirements into trackable tasks for users.",
      "points": [
        "An activity represents work requiring attention and is assigned to a group and user. Activities may be created manually or by application processes, depending on configuration.",
        "Test the selected activity pattern, subject, priority and calculated dates. Use controlled examples around weekends or holidays only where the configured calendar rules apply.",
        "Verify completion, skipping or approval actions as applicable, including required notes and permissions. A closed activity does not automatically prove the associated business operation completed successfully."
      ],
      "q": "How would you test an automatically created follow-up activity?",
      "a": "I would trigger the intended business event and verify exactly the expected task, owner and due date. I would repeat the trigger where allowed to check duplicate behavior. Then I would complete the activity with an authorized user and verify its state and any configured downstream effect.",
      "practice": "Write a task-based test for requesting missing evidence after a claim is opened.",
      "source": [
        "Guidewire · Activities",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/141-Framework/01_activities/c_activities.html"
      ]
    },
    {
      "title": "Activity assignment & work distribution",
      "intro": "A claim owner and an activity owner are related concepts but need not be the same person.",
      "points": [
        "Activity assignment can use a specific eligible user and group or supported automated assignment behavior. Validate the allowed combinations and the user’s membership in the selected group.",
        "Test work moved from one adjuster to another, including the previous owner’s task list and the new owner’s visibility. Keep a second activity as a control for unintended bulk changes.",
        "If queues are used in the project, test claiming and assigning work according to their rules. Include simultaneous attempts so the final owner is clear and work is not silently lost."
      ],
      "q": "How would you test reassignment without relying only on the activity screen?",
      "a": "I would compare the activity’s stored owner and the relevant users’ work lists. I would verify that the previous user no longer sees it as assigned work and that the new user can perform the permitted actions. I would also inspect the audit evidence and an unaffected control task.",
      "practice": "Create a two-user reassignment test with one activity that should remain unchanged.",
      "source": [
        "Guidewire · Assigning activities",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/141-Framework/01_activities/c_assigning-activities.html"
      ]
    },
    {
      "title": "Reserve lines, cost types & cost categories",
      "intro": "Financial classification determines where a transaction belongs and how totals should be interpreted.",
      "points": [
        "A reserve line groups related financial transactions. Cost type distinguishes broad purposes such as claim indemnity and expense; cost category gives a more detailed classification.",
        "Identify the exposure or claim-level context and currency alongside the classification. Two transactions with the same displayed description may still belong to different reserve lines.",
        "Test a repair payment and an inspection expense as separate financial purposes. Verify that changing one line updates only the relevant totals and that unsupported classifications are rejected."
      ],
      "q": "How would you investigate a correct payment amount shown under the wrong financial category?",
      "a": "I would trace the payment to its reserve line and compare cost type, cost category, exposure and currency with the expected mapping. I would verify the category-level totals after correction. Checking only the claim’s grand total could miss the classification defect.",
      "practice": "Design a reconciliation sheet that separates repair indemnity from assessment expense.",
      "source": [
        "Guidewire · Reserve lines",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/01-reserves/c_overview-of-reserves-in-ClaimCenter.html"
      ]
    },
    {
      "title": "Authority limits & financial approvals",
      "intro": "Financial authorization is a business rule, not simply the presence of a payment button.",
      "points": [
        "Authority limit profiles control relevant financial limits for users. The applicable authority and approval rules should be checked for the acting user and operation in the specific implementation.",
        "Test amounts just below, at and above a configured threshold, plus the expected approval routing. Verify that changing currency or transaction grouping cannot incorrectly bypass the intended control.",
        "Include direct API attempts by a user lacking authority, rejection by the approver and a changed transaction after approval. Confirm which changes require renewed approval under the project rules."
      ],
      "q": "How would you test a payment approval threshold?",
      "a": "I would create a known user profile and test threshold boundaries with otherwise identical data. I would verify immediate versus referred processing, the assigned approval activity and the final transaction state. I would also test that the restricted user cannot bypass the approval through another supported interface.",
      "practice": "Build a three-amount boundary table for a fictional authority limit of 5,000.",
      "source": [
        "Guidewire · Authority limit profiles",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/141-Framework/04_users-and-groups/c_authority_limit_profiles_ClaimCenter.html"
      ]
    },
    {
      "title": "Check sets, payees & payment composition",
      "intro": "The outward payment instruction and its underlying claim financial transactions must agree.",
      "points": [
        "Check creation can involve a check set, a check and one or more underlying payment line items. Verify their relationships, rather than treating every displayed row as a separate disbursement.",
        "Check the intended payee, payee role, payment method, currency and reserve-line allocation. Multiple payees or line items require explicit expected values and totals.",
        "Test missing or mismatched payee information, invalid currency combinations and the appropriate claim/exposure readiness. Distinguish a successfully prepared instruction from confirmed external payment execution."
      ],
      "q": "What do you validate besides the amount when creating a check?",
      "a": "I validate the payee identity and role, payment method, line-item totals and reserve-line allocation. I also verify required readiness and approval conditions. I then trace the check’s status separately from external processing so a created record is not mistaken for money already issued.",
      "practice": "Create a payment checklist for two line items allocated to different expense categories.",
      "source": [
        "Guidewire · Check creation",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/02-check-creating/c_POSTing-checks.html"
      ]
    },
    {
      "title": "Recurring payments & schedule boundaries",
      "intro": "Recurring financial instructions combine payment rules with calendar behavior, making boundary cases especially important.",
      "points": [
        "A recurrence defines a repeated schedule for checks. Confirm the supported recurrence unit, start or end conditions and the precise calendar interpretation used in your implementation.",
        "Test month-end dates, short months and a schedule that crosses a year boundary. Calculate expected occurrences before execution and compare dates as well as the number of generated instructions.",
        "Check changes or cancellation of future occurrences without unintentionally altering already processed payments. Test a rerun of the scheduling process for duplicate generation and appropriate audit evidence."
      ],
      "q": "How would you test a payment scheduled on the last part of each month?",
      "a": "I would use an approved schedule definition and choose months with different lengths. I would verify the expected due dates and generated payment count, then test a restart or rerun. I would clarify short-month behavior rather than assuming the date automatically rolls forward or backward.",
      "practice": "Prepare expected dates for a recurrence spanning February, March and April.",
      "source": [
        "Guidewire · Recurring checks",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/02-check-creating/c_recurrences.html"
      ]
    },
    {
      "title": "Check issuance, clearing, stops & voids",
      "intro": "External payment processing has several meaningful states, each with different permitted actions.",
      "points": [
        "A submitted instruction may progress through requested, issued and cleared states in the documented process. Stop and void paths are separate alternatives, and not every transition is valid from every state.",
        "Build a state-transition table from the actual payment integration design. Test acknowledgments arriving late, duplicate callbacks and an invalid request such as clearing an instruction before issuance.",
        "Verify that a stop request is not displayed as a confirmed stop before the appropriate acknowledgment. Reconcile status, financial effects and correlation identifiers across the application and payment provider."
      ],
      "q": "Why is “pending stop” different from “stopped”?",
      "a": "A pending stop records that a request has been made; it does not prove the payment provider completed it. I would verify the response or callback required to confirm the final state and test failures or late issuance. The UI and financial reconciliation must reflect the actual outcome.",
      "practice": "Create a transition matrix for requested, issued, cleared, pending stop and stopped.",
      "source": [
        "Guidewire · Check lifecycle after submission",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/03-check-lifecycle/c_the-check-life-cycle-after-submission.html"
      ]
    },
    {
      "title": "Recoveries & recovery reserves",
      "intro": "Money expected to come back to the insurer is different from money already received.",
      "points": [
        "A recovery reserve estimates a future receipt, whereas a recovery records an actual receipt. Recovery examples can include subrogation, salvage or deductible-related receipts under the business process.",
        "Keep expected and actual amounts separate in test data. If 2,000 is anticipated and only 1,500 arrives, verify the resulting balances using the project’s financial definitions.",
        "Test partial receipts, duplicate external receipt references and incorrect exposure or category allocation. Reconcile the transaction with its source evidence rather than relying solely on a reduced claim net total."
      ],
      "q": "How would you test a partial recovery?",
      "a": "I would establish the expected recovery reserve and then post a smaller actual receipt against the intended classification. I would verify the received amount, remaining estimate and configured claim summaries. I would include a repeated receipt notification to ensure it cannot create a second unintended financial effect.",
      "practice": "Design a recovery test with an expected 2,000 receipt followed by two partial receipts.",
      "source": [
        "Guidewire · Recoveries and recovery reserves",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/04-recoveries/c_recoveries_and_recovery_reserves.html"
      ]
    },
    {
      "title": "Subrogation tracking & recovery opportunities",
      "intro": "Subrogation tracking records an opportunity to recover costs from a responsible party; it does not guarantee a successful recovery.",
      "points": [
        "ClaimCenter supports subrogation summaries and related records. Test the information captured for the responsible party, pursuit decision and relevant status using your configured business rules.",
        "Separate the operational pursuit record from the eventual financial receipt. An agreement or pursuit status must not automatically be treated as money received unless the integration explicitly records that transaction.",
        "Cover multiple potential parties, changed pursuit decisions and closure without recovery. Verify that reports distinguish estimated opportunity, pursued amount and actual recovered money where those measures are used."
      ],
      "q": "How would you test a subrogation case that closes without receiving money?",
      "a": "I would verify the recorded decision, reason and workflow state, then confirm that no actual recovery transaction is created merely because pursuit ends. I would reconcile any expected recovery estimate according to the project rules and inspect the operational and financial reports separately.",
      "practice": "Write a scenario contrasting a successful recovery with an abandoned recovery opportunity.",
      "source": [
        "Guidewire · Subrogation",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/04-recoveries/c_subrogation_summaries-subrogations.html"
      ]
    },
    {
      "title": "Multicurrency & exchange-rate evidence",
      "intro": "A claim, reserve and payment may use different currencies when multicurrency is enabled.",
      "points": [
        "Distinguish claim currency, reserving currency, transaction currency and reporting currency. Do not add amounts from different currencies without an explicit conversion basis.",
        "Record the rate, rate direction and rounding precision used in the expected result. Test an approved stored rate and a permitted transaction-specific rate where the configuration supports it.",
        "Verify converted amounts in transaction details and summaries. Include unsupported currencies, missing conversion information and repeated processing after the rate source changes to confirm the intended historical treatment."
      ],
      "q": "How would you investigate a multicurrency total mismatch?",
      "a": "I would compare currency roles, rate direction, rate selection and rounding at each step. I would distinguish a wrong transaction amount from a correct transaction converted incorrectly for reporting. My evidence would include the rate used for that transaction rather than only today’s exchange rate.",
      "practice": "Reconcile a fictional payment in one currency against a reserve in another using a fixed test rate.",
      "source": [
        "Guidewire · Multicurrency",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/112-CCFin/06-multicurrency/c_multicurrency-overview.html"
      ]
    },
    {
      "title": "Service requests & vendor work",
      "intro": "A service request coordinates work performed by a specialist, such as repairs, towing or an assessment.",
      "points": [
        "The request groups relevant services with a provider, instruction, customer and location. Verify that the incident and exposure links identify the work’s actual claim context.",
        "Different service-request kinds support different business flows, such as obtaining a quote or requesting performance of work. Choose a kind compatible with the selected services and test its required information.",
        "Follow submission, acceptance, progress and completion through the configured integration. Include a vendor declining work, cancellation and duplicate notifications so the request does not advance incorrectly."
      ],
      "q": "How would you test a vendor declining a service request?",
      "a": "I would create and submit an eligible request, send or simulate the permitted decline response, and verify its recorded state and reason. I would check the configured follow-up task or reassignment path, while confirming that no completed-work or payment outcome is inferred from a declined request.",
      "practice": "Build a service-request state table for one towing example, including decline and cancellation.",
      "source": [
        "Guidewire · Service requests",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/06-service-requests/c_overview-of-service-requests-in-ClaimCenter.html"
      ]
    },
    {
      "title": "Vendor quotes & approval decisions",
      "intro": "A vendor quote is a proposed cost or scope of work that must remain distinguishable from approved work and final billing.",
      "points": [
        "For request kinds that require a quote, verify the submitted amount, currency, line details and relationship to the correct service request. A quote on one request must not approve another provider’s work.",
        "Test the allowed acceptance or rejection process, including who may decide and whether revised quotes need another decision. Use a known expected approval result before triggering the action.",
        "Include missing quote details, mismatched currencies and a late revision after an earlier decision. Confirm the resulting work state using the configured vendor process rather than assuming all approvals immediately complete the service."
      ],
      "q": "How would you test a revised vendor quote?",
      "a": "I would preserve the original quote and decision evidence, submit a distinct revision using the supported workflow, and verify the latest amount and approval requirement. I would check that old approval does not silently authorize a materially changed quote unless the business rules explicitly permit it.",
      "practice": "Create a two-version quote scenario with different amounts and expected decision states.",
      "source": [
        "Guidewire · Service request quotes",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/06-service-requests/c_service-request-quotes.html"
      ]
    },
    {
      "title": "Service invoices & payment linkage",
      "intro": "A vendor invoice is evidence of a requested charge; its approval and payment are separate checkpoints.",
      "points": [
        "Verify the invoice belongs to the correct service request and includes consistent reference, amounts, currency and line information. Use distinct invoice numbers to distinguish legitimate installments from duplicates.",
        "Test invoice approval, withdrawal and payment-related actions according to the service workflow. A status update marking an invoice paid must be reconciled with the actual payment process used by the integration.",
        "Where automatic processing is configured, test eligibility boundaries and cases that require manual review. Include a duplicate invoice callback, a changed amount and an invalid action on a withdrawn invoice."
      ],
      "q": "How would you test automatic approval of a service invoice?",
      "a": "I would obtain the configured eligibility conditions, create cases on both sides of each boundary and verify the actual approval result. I would separately confirm payment linkage and financial impact. I would not treat approval alone as proof that the provider has been paid.",
      "practice": "Write five invoice cases covering duplicate reference, amount change, automatic approval, manual review and withdrawal.",
      "source": [
        "Guidewire · Service request invoices",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/06-service-requests/c_service-request-invoices.html"
      ]
    },
    {
      "title": "Matters & litigation-related tracking",
      "intro": "A matter organizes information about a legal proceeding associated with a claim.",
      "points": [
        "A matter has its own assignment and lifecycle even though it belongs to a claim. Verify responsible user and group, relevant legal-party associations and required descriptive information in the configured implementation.",
        "Test creating, editing, closing and reopening the matter. Confirm how the closure date is represented and that reopening preserves the historical information needed to understand the proceeding.",
        "Distinguish matter closure from claim closure. Include a claim with two matters so an update to one cannot incorrectly close the other or alter the whole claim’s financial state."
      ],
      "q": "Why should litigation matter closure be tested separately from claim closure?",
      "a": "A matter represents a particular proceeding, while the claim may contain other unresolved obligations. I would check the matter’s state and closure information independently, then verify only the claim-level effects specified by the project. I would retain another open matter as a control.",
      "practice": "Model two matters on one claim and define the expected result when only one is closed.",
      "source": [
        "Guidewire · Matters",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/111-CCFNOL/07-matters/c_matters.html"
      ]
    },
    {
      "title": "Catastrophes, zones & peril matching",
      "intro": "Catastrophe classification groups losses associated with a major event and supports operational and financial analysis.",
      "points": [
        "A catastrophe can be described by a date range, geographic zones and relevant perils. Verify the intended association using all applicable dimensions rather than a shared event name alone.",
        "Design boundary cases for a loss just inside or outside the dates and affected area. Include a different loss cause at the same location to exercise the configured peril-matching behavior.",
        "Check a corrected association and its reporting effects. A catastrophe link must not overwrite the claim’s original loss details or automatically imply a coverage outcome."
      ],
      "q": "How would you test catastrophe association for a storm?",
      "a": "I would prepare claims varying loss date, location and cause while keeping other details stable. I would compare the expected associations with the configured rule and inspect grouped reporting. I would include a manual correction if supported and verify the original loss information remains accurate.",
      "practice": "Create a six-case matrix around an event’s date, location and peril boundaries.",
      "source": [
        "Guidewire · Catastrophes",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/c_catastrophes.html"
      ]
    },
    {
      "title": "Document metadata, content & access",
      "intro": "A document record and the actual file content are related but separately testable parts of the claim record.",
      "points": [
        "Verify metadata such as title, type, related claim and author together with the file that is downloaded or previewed. Correct metadata cannot compensate for a file attached to the wrong claim.",
        "Test supported formats, size limits, duplicate names and failures between content storage and metadata persistence. Expected cleanup or recovery behavior must follow the document integration contract.",
        "Use synthetic files to test restricted access and direct retrieval attempts. Check that a user unable to view the claim cannot obtain an attachment merely by knowing its identifier."
      ],
      "q": "How would you investigate a document that appears in a claim but cannot be opened?",
      "a": "I would inspect the document record, content reference, storage response and the current user’s permissions. I would distinguish missing content from an authorization problem and verify any retry or reconciliation behavior. I would also confirm that the file was not stored under a different claim’s reference.",
      "practice": "Define tests for metadata success with content failure and content success with metadata failure.",
      "source": [
        "Guidewire · Documents",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/141-Framework/02_documents/c_overview-of-documents.html"
      ]
    },
    {
      "title": "Claim notes & communication context",
      "intro": "Notes preserve explanations and observations that structured claim fields do not fully capture.",
      "points": [
        "A note should be attached to the intended claim or supported related object and carry the correct author and classification. Verify persistence with multiline text and characters used in your supported languages.",
        "Test required note information, edit permissions and deletion behavior where permitted. Confirm whether author, timestamp and history remain trustworthy after edits rather than assuming every note is immutable.",
        "Ensure sensitive content is shown only to the intended roles. For automated tests, use fictional text and verify rendering does not interpret entered markup as executable page content."
      ],
      "q": "How would you test a claim note beyond checking that it saves?",
      "a": "I would verify the right claim association, author, classification and rendered text. I would include multiline and special-character input, then test the allowed edit and visibility rules with a second user. A note saved successfully on the wrong claim is still a serious defect.",
      "practice": "Write a note test using multiline content, an apostrophe and harmless markup characters.",
      "source": [
        "Guidewire · Notes",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/141-Framework/03_notes/c_notes.html"
      ]
    },
    {
      "title": "History events & traceable claim changes",
      "intro": "History provides evidence of selected business events, but its scope must be understood before using it as a complete audit trail.",
      "points": [
        "ClaimCenter records history events for configured actions. Verify the relevant event type, description, timestamp, actor and associated claim against the operation you performed.",
        "Use a before-and-after sequence for a reassignment or financial change and distinguish system-generated actions from user actions. Do not assume every field edit automatically produces the same history detail.",
        "Check chronological interpretation across time zones, repeated actions and access restrictions. Preserve correlation identifiers with test evidence when a history entry must be traced to an integration request."
      ],
      "q": "How would you prove a claim change is traceable?",
      "a": "I would perform a controlled action, verify the resulting business state and inspect the expected history entry for actor, time and claim association. I would compare this with the configured event policy and integration evidence. I would not claim complete field-level auditing from one visible history row.",
      "practice": "Prepare an evidence checklist linking an assignment change to its user, time and history event.",
      "source": [
        "Guidewire · History events",
        "https://docs.guidewire.com/cloud/cc/202511/cloudapibf/cloudAPI/topics/141-Framework/08_history-events/c_history-events.html"
      ]
    }
  ],
  "billingcenter": [
    {
      "title": "Account, policy and policy-period hierarchy",
      "intro": "Billing records have different ownership levels. Identify the correct level before asserting balances or building test data.",
      "points": [
        "An account is the billing relationship; policies and their terms sit beneath it. A policy-period reference identifies a particular term, so a renewal must not be treated as an update to every prior term.",
        "QA example: create two policies under one account and two terms for one policy. Make each premium distinct, then verify that a term-specific adjustment reaches only its intended target.",
        "Capture both business identifiers and resource identifiers in test evidence. A familiar policy number in the UI does not prove that an integration selected the correct term or account."
      ],
      "q": "Why is account-level validation insufficient for a policy-term change?",
      "a": "An account total can remain correct even if an adjustment reaches the wrong term. I would compare the intended term, its charges and the account rollup, then inspect the untouched policy as a negative control. I would also verify effective and expiration dates against the source instruction.",
      "practice": "Draw one account with two policies and a renewal term. Mark where you would assert an endorsement adjustment.",
      "source": [
        "Guidewire · Issuing policies",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/policies/c_issuing-policies.html"
      ]
    },
    {
      "title": "Billing instructions and transaction identity",
      "intro": "A policy event supplies billing information that must be interpreted once and attached to the right business transaction.",
      "points": [
        "Treat the incoming issuance or later policy-event message as a contract: identify the account, policy term, effective date, charges and selected plans. The exact transport and message schema depend on the integration.",
        "QA example: submit a controlled instruction, retain its business reference and verify the resulting charge records. A successful transport acknowledgment is not sufficient evidence of completed business processing.",
        "Exercise missing references, an unavailable dependency and a replay after a timeout. Verify the project’s duplicate-detection contract rather than assuming every create request is automatically idempotent."
      ],
      "q": "What would you capture when a policy-issued event creates no billing record?",
      "a": "I would retain the source transaction, payload and correlation reference, confirm receipt, and identify whether validation or processing failed. I would compare account and term prerequisites, then test the documented recovery procedure. I would check for an existing result before replaying the event.",
      "practice": "Write an evidence checklist for tracing one issuance event from its sender to the resulting charges.",
      "source": [
        "Guidewire · Issuing policies",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/policies/c_issuing-policies.html"
      ]
    },
    {
      "title": "Charge patterns: premium, tax and fee behavior",
      "intro": "Charge patterns classify a cost and influence its treatment; a display label alone does not define the accounting behavior.",
      "points": [
        "A charge can represent premium, a tax or a fee. Its pattern carries attributes such as category and invoice treatment, so two equal amounts can follow different billing rules.",
        "QA example: create three distinguishable charge amounts and verify each pattern association, installment eligibility and downstream classification. Use the accounting team’s approved expectations for recognition treatment.",
        "Include an invalid pattern, an unavailable pattern and a configuration change affecting new transactions. Do not silently map an unknown charge type to a convenient default."
      ],
      "q": "How would you investigate a fee spread over installments unexpectedly?",
      "a": "I would verify the charge pattern selected by the integration, its invoice treatment and the payment-plan interaction. Then I would compare the generated invoice items with the approved schedule. This locates whether the error starts in source mapping, configuration or item generation.",
      "practice": "Create a test matrix for premium, pass-through tax and one-time fee charges with separate expected invoice treatments.",
      "source": [
        "Guidewire · Charges and charge patterns",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/132-BCBilling/charge-patterns/c_charges_and_charge_patterns.html"
      ]
    },
    {
      "title": "Invoice items and charge slicing",
      "intro": "An invoice item represents part or all of a charge. This explains why one premium can appear across several invoices.",
      "points": [
        "BillingCenter creates invoice items from charges and places those items on invoices. Retain the parent charge relationship when validating a schedule; equal-looking lines may belong to different costs.",
        "QA example: split a fictional 1,000 premium into three installments. Verify that item amounts reconcile to 1,000 under the approved rounding rule and that each item is on the intended invoice.",
        "Check zero or negative adjustments, an immediate fee and a midterm schedule change. Separate already-billed items from future items when evaluating the expected reslicing behavior."
      ],
      "q": "Why should an automated billing test inspect invoice items?",
      "a": "The invoice total can conceal an incorrectly split charge or a line placed on the wrong date. I would validate each item’s charge reference, amount and placement, then reconcile both invoice totals and the original charge total. I would use a rounding-sensitive example.",
      "practice": "Design assertions for a charge split into three items where the final item absorbs the permitted rounding remainder.",
      "source": [
        "Guidewire · Charges and charge patterns",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/132-BCBilling/charge-patterns/c_charges_and_charge_patterns.html"
      ]
    },
    {
      "title": "Invoice streams and billing cadence",
      "intro": "An invoice stream organizes invoice scheduling. Its relationship to policies matters when several billing schedules coexist.",
      "points": [
        "An invoice stream creates and manages invoices on a cadence. Separate streams can be required for differing periodicities or for policy-level billing, depending on the account setup.",
        "QA example: place monthly and quarterly obligations on the same account. Verify that future invoices follow the appropriate streams instead of merging merely because they share an account.",
        "Test a short month, a changed preferred day and a renewal using the project’s rules. Inspect stream associations as well as visible due dates so a coincidental date match cannot hide incorrect routing."
      ],
      "q": "How do you distinguish an invoice-stream defect from an incorrect charge amount?",
      "a": "I compare the charge and item totals first, then trace item placement and invoice cadence. Correct money on incorrect dates suggests scheduling or stream selection. Incorrect money before placement points toward input or slicing logic. I document both the stream ID and the expected timeline.",
      "practice": "Sketch six months of invoices for monthly and quarterly streams under one account.",
      "source": [
        "Guidewire · Invoices",
        "https://docs.guidewire.com/cloud/bc/202511/cloudapibf/cloudAPI/topics/132-BCBilling/invoices/c_invoices.html"
      ]
    },
    {
      "title": "Bill date, due date and invoice status",
      "intro": "The day a bill is produced and the day payment becomes due serve different purposes and need separate assertions.",
      "points": [
        "Guidewire’s invoice documentation distinguishes the invoice event or bill date from its payment due date. A test should not substitute one for the other when evaluating aging or notices.",
        "QA example: a bill is sent on the 5th and due on the 25th. Check the visible document, scheduled processing and overdue evaluation at the agreed date boundaries.",
        "Invoice modification rules depend on state and API version. Test permitted updates on planned invoices and rejection of unsupported changes after billing, without assuming the UI and API expose identical operations."
      ],
      "q": "What makes an invoice-date test reliable?",
      "a": "I control the relevant business date, record the expected bill and due dates separately and verify the status transition. I include one boundary before and after the due date and account for the configured processing schedule. I inspect stored values instead of relying only on a formatted display.",
      "practice": "Write a timeline with bill date, due date, grace-period end and the batch that evaluates lateness.",
      "source": [
        "Guidewire · Working with invoices",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/invoices/c_working_with_invoices.html"
      ]
    },
    {
      "title": "Account-level versus policy-level billing",
      "intro": "Billing organization influences which obligations are grouped and where funds can be applied.",
      "points": [
        "Account-level billing can combine obligations within an account, while policy-level billing separates scheduling by policy. Confirm the configured account model before building invoice-count assertions.",
        "QA example: two policies share an account and the same cadence. Compare the expected invoice grouping, item ownership and unapplied-fund associations under each billing arrangement.",
        "Test a payment targeted to one policy and an account payment without a policy target. Verify that the allocation configuration honors intended scope; sharing an account should not imply unrestricted cross-policy allocation."
      ],
      "q": "Why might two accounts with identical premiums produce different numbers of invoices?",
      "a": "Their billing organization or invoice streams may differ. I would compare account-versus-policy billing, periodicity and item placement before calling the count a defect. I would then reconcile each policy’s obligations and confirm that no line was omitted or included twice.",
      "practice": "Create expected invoice groupings for two policies under account-level and policy-level billing.",
      "source": [
        "Guidewire · Working with invoices",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/invoices/c_working_with_invoices.html"
      ]
    },
    {
      "title": "Billing plans and operational preferences",
      "intro": "A billing plan governs account billing operations and should not be confused with the policy’s installment schedule.",
      "points": [
        "Billing plans influence operations such as invoice delivery, automatic disbursement handling and payment-request creation. These are different concerns from splitting a policy charge into installments.",
        "QA example: compare accounts assigned to two approved billing plans with different communication behavior. Verify the generated instruction or document destination, not merely the selected plan label.",
        "Cover plan availability, missing required selection and changes on an account that already has invoices. Obtain expected treatment of existing versus future transactions before testing a plan switch."
      ],
      "q": "How would you explain a billing plan versus a payment plan?",
      "a": "A billing plan controls account-level billing operations; a payment plan defines how a policy’s charges are divided and scheduled. I would test each independently, then test their interaction. An incorrect delivery method is not necessarily an installment-plan problem.",
      "practice": "List three assertions for invoice delivery and three separate assertions for installment generation.",
      "source": [
        "Guidewire · Billing plans",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/cloudAPI/topics/131-BC/03-billing-plans/c_billing_plans.html"
      ]
    },
    {
      "title": "Payment plans and installment structure",
      "intro": "A payment plan connects a policy charge to a schedule of invoice items, including the number and shape of installments.",
      "points": [
        "The policy payment plan determines charge slicing and placement. Start from an approved schedule example rather than deriving all expected values from the application’s own output.",
        "QA example: use a premium that divides unevenly, then check installment count, amounts, dates and the total. Include a fee whose charge pattern does not follow the premium’s installment behavior.",
        "Test an unavailable plan, an unsupported currency and a midterm plan-change requirement if your implementation supports it. Clarify how future items and already-billed items are treated."
      ],
      "q": "What data would you need before testing a payment-plan change?",
      "a": "I need the original schedule, remaining unpaid items, effective date, new plan and approved rescheduling rules. I would compare before and after schedules, reconcile totals and verify that historical billed obligations remain correct. I would include a case with an existing partial payment.",
      "practice": "Prepare expected schedules for full pay and four installments using the same fictional premium.",
      "source": [
        "Guidewire · Payment plans",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/131-BCPlans/payment-plans/c_payment_plans.html"
      ]
    },
    {
      "title": "Down payment versus out-of-sequence first installment",
      "intro": "A first payment outside the usual cadence is not always a down payment; the amount rule is a key distinction.",
      "points": [
        "A down payment can use a different amount from the periodic installments. An out-of-sequence first installment has installment-like amount behavior but a placement date outside the later regular cadence.",
        "QA example: compare a percentage deposit with an equal first installment placed early. Verify both the amount logic and dates, using a premium that makes the difference obvious.",
        "In the documented plan model, down payment and out-of-sequence first installment are alternative approaches. Check applicable configuration validation, then test rounding and short-term scheduling boundaries."
      ],
      "q": "What is a common error when validating the first installment?",
      "a": "Treating every early first item as a percentage deposit. I would identify the plan’s configured approach, independently calculate the expected first amount and compare the later periodic items. I would also verify placement dates separately from bill and due dates.",
      "practice": "For a 1,200 charge, contrast a 20% deposit with an equal first installment in a four-item schedule.",
      "source": [
        "Guidewire · Payment-plan concepts",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/131-BCPlans/payment-plans/c_overview_of_payment_plans.html"
      ]
    },
    {
      "title": "Payment allocation: eligibility before priority",
      "intro": "Before deciding which item gets paid first, determine which items are allowed to receive the money at all.",
      "points": [
        "Payment allocation plans contain eligibility criteria and ordering criteria. Eligibility rules can restrict candidates by invoice state or a specified invoice or policy-period target.",
        "QA example: create one due item, one billed item and one future planned item, then apply a targeted payment. Identify the eligible set before predicting the paid amounts.",
        "Test a target with no eligible items and a payment smaller than one item. Verify remaining unapplied money instead of assuming that all available cash must be distributed immediately."
      ],
      "q": "Why can an account have both unpaid invoices and unapplied money?",
      "a": "The unpaid items may not meet the distribution criteria for that payment or fund. I would inspect payment targets, item status and allocation-plan eligibility before diagnosing an error. Then I would compare the eligible amount with the distributed and unapplied balances.",
      "practice": "Build an eligibility table for three invoice states and a payment restricted to one policy period.",
      "source": [
        "Guidewire · Payment allocation plans",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/cloudAPI/topics/131-BC/06-payment-allocation-plans/c_payment_allocation_plans.html"
      ]
    },
    {
      "title": "Payment allocation: ordering and partial settlement",
      "intro": "When eligible obligations exceed available money, their configured ordering determines which items become paid or partly paid.",
      "points": [
        "Ordering rules resolve competition among eligible invoice items. Common dimensions include dates and charge-pattern priority, but the configured order and tie-breakers are the actual test oracle.",
        "QA example: create three eligible items totaling 300 and pay 170. Choose different dates and charge types so the intended ordering produces a clearly distinguishable distribution.",
        "Verify each item’s remaining amount, the total distribution and any residual fund balance. Include a tie case; a test that checks only the account balance cannot detect payment against the wrong obligation."
      ],
      "q": "How would you prove a payment was allocated in the wrong order?",
      "a": "I would show that the same items were eligible, document their configured priority values and calculate the expected distribution. I would compare item-level actual results while reconciling the overall amount. This separates an ordering defect from missing eligibility or insufficient funds.",
      "practice": "Write expected item balances for a 170 payment against prioritized items of 100, 100 and 100.",
      "source": [
        "Guidewire · Payment allocation plans",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/cloudAPI/topics/131-BC/06-payment-allocation-plans/c_payment_allocation_plans.html"
      ]
    },
    {
      "title": "Unapplied funds and balance ownership",
      "intro": "Unapplied money belongs to a defined accounting location; it is not a generic pool available to every obligation.",
      "points": [
        "BillingCenter uses unapplied funds to hold money before distribution. Account-level and policy-level billing can have different fund arrangements, so identify the correct owner in every assertion.",
        "QA example: receive 150 for an eligible obligation of 100. Verify the 100 distribution and the 50 remainder in the appropriate fund, with no unintended movement to another policy.",
        "Repeat the test when no item is eligible. Check reports and fund balances together, and distinguish unavailable response fields from zero-valued fields when validating API output."
      ],
      "q": "Is unapplied money the same as a payment that was never received?",
      "a": "No. It can be received money awaiting allocation to eligible obligations. I would trace the payment to its fund and distribution records, reconcile the remainder and confirm ownership. A missing field in a compact API response would require the supported field selection or another authoritative view.",
      "practice": "Create a reconciliation formula connecting received funds, distributions, permitted transfers and the remaining unapplied balance.",
      "source": [
        "Guidewire · Unapplied funds",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/cloudAPI/topics/131-BC/11-accounts/c_unapplied_funds.html"
      ]
    },
    {
      "title": "Suspense payments: when the payer target is unknown",
      "intro": "A payment can arrive before BillingCenter knows which account or policy it belongs to, requiring controlled resolution.",
      "points": [
        "A suspense payment records received money without an identified existing target. This can happen because the account has not arrived from the policy system or the identifying information is wrong.",
        "QA example: submit a payment before the associated account exists. Later create the expected target and exercise the approved resolution process; reconcile the transferred money and retained reference.",
        "Test an incorrect target, a repeated resolution request and the case where ownership remains unknown. Verify permitted reversal or return behavior rather than assigning funds to a guessed account."
      ],
      "q": "What would you test when resolving a suspense payment?",
      "a": "I would verify the original money, payment reference and target identification, then confirm the resolved account or policy receives exactly the intended amount. I would retain an audit trail and include an invalid or already-resolved case. I would ensure that a retry does not duplicate the credit.",
      "practice": "Write a two-stage scenario where money arrives first and the account is created later.",
      "source": [
        "Guidewire · Suspense payments",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/132-BCBilling/direct-bill-payments/c_suspense-payments.html"
      ]
    },
    {
      "title": "Suspense items versus standalone suspense payments",
      "intro": "An unknown account and an unknown target within a known account represent different data situations.",
      "points": [
        "A suspense item can represent an undistributable part of a payment for a known account or producer. A standalone suspense payment is appropriate when the owning target itself is not yet known.",
        "QA example: a known customer pays for a renewal term that has not arrived yet. Verify the implementation retains the known ownership while leaving the unresolved portion identifiable.",
        "Test a payment with both a valid distributable portion and an unresolved portion. Reconcile their sum and confirm that resolving the latter does not reapply the already-paid part."
      ],
      "q": "How would you distinguish suspense items in test data?",
      "a": "I would create one case where the account is missing and another where the account exists but the intended term does not. The expected objects and ownership differ. I would then verify the supported resolution workflow and that the original total is conserved without double application.",
      "practice": "Design a 200 payment split into a known 120 obligation and an unresolved 80 target.",
      "source": [
        "Guidewire · Suspense payments and items",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/app/bc/030_payments/06_payments_in_suspense/c_overview-of-suspense-payments-and-suspense-items.html"
      ]
    },
    {
      "title": "Payment instruments and account ownership",
      "intro": "A payment instrument identifies how money is received or requested; instrument type and ownership need independent checks.",
      "points": [
        "BillingCenter distinguishes broadly usable instruments from account-specific instruments such as a particular bank or card reference. Only synthetic tokens and approved sandbox payment data belong in testing.",
        "QA example: configure two accounts with different instruments and attempt to use account A’s instrument for account B. Verify the contract rejects an invalid ownership association.",
        "Check supported instrument types, defaults, masked presentation and permissions. A label such as Card does not prove that the correct token or account-specific reference will be sent downstream."
      ],
      "q": "What should a payment-instrument automation test avoid?",
      "a": "It should avoid storing real payment credentials in source code, logs or screenshots. I would use approved test tokens and assert the intended instrument reference, type and owner. I would also validate that unauthorized users cannot retrieve or select another account’s instrument.",
      "practice": "Prepare a matrix of instrument type, account ownership, default selection and allowed operation.",
      "source": [
        "Guidewire · Payment instruments",
        "https://docs.guidewire.com/cloud/bc/202511/cloudapibf/cloudAPI/topics/132-BCBilling/accounts/c_payment_instruments.html"
      ]
    },
    {
      "title": "Payment requests and automatic collections",
      "intro": "Requesting an automatic collection is a distinct event from receiving and successfully settling money.",
      "points": [
        "A payment request coordinates an automatic withdrawal from a suitable payment instrument. Validate requested amount and draft timing separately from the eventual payment result.",
        "QA example: bill an account with an approved automatic-payment setup. Trace the generated request through the sandbox processor and verify success, rejection and delayed acknowledgment paths.",
        "Test a changed invoice amount, invalid instrument and duplicate external callback using the integration’s rules. Do not infer that the invoice is settled merely because a request record exists."
      ],
      "q": "What are the key checkpoints in an autopay test?",
      "a": "I check account setup, invoice amount, request amount and timing, selected instrument, processor response and resulting financial state. I would include a timeout with an uncertain external outcome and confirm that recovery avoids a second withdrawal. Each stage needs its own evidence.",
      "practice": "Create a timeline showing an invoice, payment request, processor response and posted payment.",
      "source": [
        "Guidewire · Payment requests",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/cloudAPI/topics/131-BC/31-direct-bill-payments/c_payment_requests.html"
      ]
    },
    {
      "title": "Payment reversal and returned-payment fees",
      "intro": "A reversal corrects a received-payment event and can restore obligations that the original payment had settled.",
      "points": [
        "The documented reversal behavior removes the payment’s distribution and associated money. Reversal reasons can influence additional configured handling, such as a fee for a returned payment.",
        "QA example: fully pay a 100 invoice, then reverse the payment with a valid reason. Verify the restored unpaid amount and any separately expected fee rather than merging both into one unexplained total.",
        "Check repeated reversal, incorrect authority, partial distributions and the downstream audit trail. Keep the original reference linked so financial investigation can explain both events."
      ],
      "q": "How is reversing a payment different from refunding an overpayment?",
      "a": "A reversal corrects the original payment’s financial effect; a refund returns eligible funds to a payer. I would verify their different records and balance changes. For reversal, I also inspect previously paid items and any reason-dependent fee, using the project’s accounting expectations.",
      "practice": "Write before-and-after balances for a 100 payment reversed with a separately configured 10 fee.",
      "source": [
        "Guidewire · Reversing payments",
        "https://docs.guidewire.com/cloud/bc/202511/cloudapibf/cloudAPI/topics/132-BCBilling/direct-bill-payments/c_reversing_payments.html"
      ]
    },
    {
      "title": "Account disbursements and refundable balances",
      "intro": "Returning money from an account requires a valid source balance, correct recipient and controlled outgoing processing.",
      "points": [
        "An account disbursement returns eligible account funds to a payer. An overpayment is a common starting point, but the return amount must follow the configured eligibility and approval rules.",
        "QA example: create a 60 eligible excess balance and request a 40 return. Verify recipient details, source funds and the residual balance, then reconcile the outgoing transaction reference.",
        "Test an amount above availability, a failed external payout and a repeated approval or callback. Separate record creation, authorization and actual payment completion in assertions."
      ],
      "q": "Why is a created disbursement not enough to pass a refund test?",
      "a": "It may still require approval or external processing. I would verify the permitted state transitions, available funds, recipient and actual financial result. If processing times out, I would check the external outcome before allowing a retry that could pay the customer twice.",
      "practice": "Design success, insufficient-funds and external-timeout cases for returning part of an overpayment.",
      "source": [
        "Guidewire · Account disbursements",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/accounts/c_account-disbursements.html"
      ]
    },
    {
      "title": "Authority limits and approval activities",
      "intro": "Some financial actions can be requested by a user but must be approved before their accounting effect is executed.",
      "points": [
        "Approval rules connect transaction type, amount and user authority. The existence of an approvable object should not be confused with an already executed financial transaction.",
        "QA example: test amounts just below, equal to and above a user’s configured limit. Verify automatic processing or approval routing according to the approved boundary rule.",
        "Test approval, rejection, an inactive approver and an unauthorized approval attempt. Inspect both the activity lifecycle and the ledger effect so closing a task cannot conceal a missing transaction."
      ],
      "q": "How would you validate financial segregation of duties?",
      "a": "I would map roles to permitted request and approval actions, then attempt the same operation with each role. I would check applicable self-approval restrictions, amount boundaries and evidence of who acted. A hidden button is insufficient; the supported service must enforce the authorization too.",
      "practice": "Create a role-by-amount decision table for a disbursement needing supervisor approval.",
      "source": [
        "Guidewire · Transaction approval",
        "https://docs.guidewire.com/cloud/bc/202411/cloudapibf/app/bc/120_supervisors/02_transaction_approval/c_wd1002113.html"
      ]
    },
    {
      "title": "Direct bill and agency bill responsibilities",
      "intro": "The billing method changes who is expected to collect and remit money and which relationships need validation.",
      "points": [
        "In a direct-bill flow, the insurer handles billing to the payer; agency billing introduces producer responsibility for remittance. Confirm the exact business arrangement and configured accounting treatment.",
        "QA example: use comparable policies with different billing methods. Verify expected payer, producer association, generated billing records and commission treatment without assuming identical workflows.",
        "Agency-bill issuance has specific producer and plan prerequisites in the documented API. Test missing prerequisites and invalid combinations against the version your project uses."
      ],
      "q": "Why should agency bill not reuse every direct-bill assertion unchanged?",
      "a": "The expected payer, statement handling and producer commission relationship can differ. I would share generic validation helpers but use scenario-specific business expectations. I would validate the primary producer and agency plan first, then reconcile the obligations and actual remittance.",
      "practice": "Draw the money and communication flows for a fictional direct-bill policy and an agency-bill policy.",
      "source": [
        "Guidewire · Issuing policies",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/policies/c_issuing-policies.html"
      ]
    },
    {
      "title": "Producer records and producer-code relationships",
      "intro": "Producer identity and its policy relationship affect billing responsibilities and commission selection.",
      "points": [
        "A producer represents an intermediary relationship. Producer codes connect producer participation to policy business, so preserve the intended role and reference during integration and renewal.",
        "QA example: use two producers with distinct identifiers and tier settings. Verify that an issuance selects the intended producer and that an unrelated producer receives no resulting financial record.",
        "Test missing, invalid and inactive references according to configured rules. Keep business names separate from immutable identifiers; similar agency names are a useful negative test."
      ],
      "q": "How would you investigate commission credited to the wrong producer?",
      "a": "I would trace the policy’s producer-code and role data from the source instruction through BillingCenter. Then I would inspect the selected plan and payable record. I would check for mapping errors or a reused test fixture before changing a commission-rate calculation.",
      "practice": "Build a test dataset with two similarly named producers and different producer codes.",
      "source": [
        "Guidewire · Working with producers",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/132-BCBilling/producers/c_working-with-producers.html"
      ]
    },
    {
      "title": "Commission plans and earning criteria",
      "intro": "A commission rate is only one part of the rule; timing, eligible business and producer role also matter.",
      "points": [
        "Commission plans and subplans define how producer commission is calculated and when it is earned. Availability and role-specific conditions can make identical premiums produce different outcomes.",
        "QA example: hold the premium constant while varying producer role or an approved earning trigger. Calculate the expected commission independently and inspect when it becomes eligible for payment.",
        "Include a policy adjustment and a delinquency-related rule where configured. Do not assume all taxes and fees are commissionable or that earning and payout occur at the same time."
      ],
      "q": "What do you need to verify a commission calculation?",
      "a": "I need the commissionable base, producer role, applicable plan or subplan, rate and earning trigger. I would reconcile the calculation before inspecting payout timing. I would include a noncommissionable charge so an incorrect base cannot accidentally pass.",
      "practice": "Calculate commission on a fictional 1,000 eligible premium while excluding a separately listed tax.",
      "source": [
        "Guidewire · Commission plans",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/plans/commission-plans.html"
      ]
    },
    {
      "title": "Commission subplans and plan availability",
      "intro": "Subplan selection can determine which rate applies before any arithmetic takes place.",
      "points": [
        "Commission subplans carry rate and availability rules within a commission plan. Policy characteristics, producer role and relevant dates must be included in the selection test.",
        "QA example: construct two eligible-looking policies differing in one approved availability condition. Verify the selected subplan and expected rate, then test a case with no valid match.",
        "Check plan changes under the documented in-use restrictions. Changing an administrative plan must not silently rewrite historical expectations without an approved migration or effective-date rule."
      ],
      "q": "How do you separate a selection error from a commission math error?",
      "a": "I first prove the correct plan and subplan were selected using the policy and producer attributes. Only then do I compare the base and rate calculation. This avoids diagnosing a correctly calculated amount under the wrong rule as a rounding defect.",
      "practice": "Create a selection matrix with two subplans, two producer roles and a date boundary.",
      "source": [
        "Guidewire · Working with commission plans",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/131-BCPlans/commission-plans/c_working-with-commission-plans.html"
      ]
    },
    {
      "title": "Agency statements and producer remittance cycles",
      "intro": "Agency billing groups obligations into producer-facing cycles that need their own scheduling and reconciliation tests.",
      "points": [
        "Agency-bill plans govern automatic behavior such as statement timing, document delivery and overdue follow-up. The cycle boundary is a separate concern from the policy’s coverage dates.",
        "QA example: place obligations immediately before and after a statement cutoff. Verify the intended statement membership and producer recipient, with no missing or duplicated invoice items.",
        "Reconcile gross obligations, commissions and expected remittance according to the approved model. Verify late adjustments and the configured handling of very small statement balances."
      ],
      "q": "How would you test statement completeness?",
      "a": "I would define the eligible item set at a controlled cycle date, compare its identifiers with the statement and reconcile the amounts. I would include a cutoff-boundary item and a late adjustment. A matching total alone could conceal an omitted item offset by an unrelated duplicate.",
      "practice": "Build a statement reconciliation worksheet with item ID, gross amount, commission and expected net.",
      "source": [
        "Guidewire · Agency bill plans",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/131-BCPlans/agency-bill-plans/c_agency-bill-plans.html"
      ]
    },
    {
      "title": "Agency promises and expected remittances",
      "intro": "A producer’s stated intention to pay is different from money received, and the distinction matters for follow-up.",
      "points": [
        "Agency plans can specify whether producer promises are expected and how missing promises are handled. Confirm that the feature and workflow exist in the target implementation.",
        "QA example: compare a promised amount with the later remittance and the underlying statement. Include a missing promise and a promise that arrives after the configured deadline.",
        "Verify that promise-related processing does not mark obligations paid prematurely. Preserve references so a customer-service user can explain the difference between expected and actual money."
      ],
      "q": "How would you test a promise without confusing it with a payment?",
      "a": "I would verify the promise record and deadline behavior while asserting that the received-payment totals remain unchanged. After actual remittance, I would reconcile the statement and any difference. I would use the configured follow-up rules rather than assuming a promise automatically pauses delinquency.",
      "practice": "Describe expected states for no promise, promise received and payment received as three separate events.",
      "source": [
        "Guidewire · Agency bill plans",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/131-BCPlans/agency-bill-plans/c_agency-bill-plans.html"
      ]
    },
    {
      "title": "Agency payment mismatches and exception resolution",
      "intro": "A remittance can disagree with gross obligations, withheld commission or both, requiring a traceable resolution.",
      "points": [
        "Payment mismatch exceptions identify differences between expected and received values for agency-bill items. Inspect gross and commission components separately instead of checking only net cash.",
        "QA example: keep net remittance similar while altering the gross and commission components. Verify that the discrepancy remains visible and that the correct item is targeted for resolution.",
        "The documented options include write-off and carry-forward behavior. Carrying an exception forward does not mean moving its item to another statement; verify the actual financial and exception outcomes."
      ],
      "q": "Why can a net amount appear correct while an agency payment is still wrong?",
      "a": "Gross and commission errors can offset one another. I would compare all components and the related invoice item, then verify the approved resolution. I would not clear an exception solely because the bank deposit matches an expected net total.",
      "practice": "Create one gross-only mismatch, one commission-only mismatch and one combined mismatch.",
      "source": [
        "Guidewire · Payment mismatch exceptions",
        "https://docs.guidewire.com/cloud/bc/202511/cloudapibf/cloudAPI/topics/132-BCBilling/agency-bill/c_ab-payment-mismatch-exceptions.html"
      ]
    },
    {
      "title": "Delinquency plans, thresholds and exit criteria",
      "intro": "Entering, escalating and exiting delinquency require explicit business thresholds and a controlled timeline.",
      "points": [
        "A delinquency plan specifies values and workflows for eligible accounts or policies. Confirm plan inheritance and any policy override before comparing behavior between two accounts.",
        "QA example: create balances just below, at and above a configured entry threshold. Make a subsequent payment near the exit threshold and verify the documented inclusivity rules.",
        "Test grace-period units, partial payments and plan availability. An account leaving delinquency must retain accurate outstanding money and history; an ended process should not erase the original obligation."
      ],
      "q": "How would you test entry and exit thresholds independently?",
      "a": "I would control the amount and evaluation date, verify entry at each boundary, and then apply a payment producing a distinct exit-boundary balance. I would inspect the process and financial records separately. Exact comparison operators and timing must come from approved requirements.",
      "practice": "Build a threshold table with entry, exit and cancellation boundaries without assuming they are equal.",
      "source": [
        "Guidewire · Delinquency-plan thresholds",
        "https://docs.guidewire.com/cloud/bc/202507/cloudapibf/cloudAPI/topics/131-BCPlans/delinquency-plans/c_creating_delinquency_plans.html"
      ]
    },
    {
      "title": "Charge holds and controlled billing pauses",
      "intro": "A hold is a targeted operational constraint, not a blanket instruction to stop every financial process.",
      "points": [
        "BillingCenter exposes charge-hold information, but the exact hold types and affected processing depend on configuration. Document the scope and release rules for the hold being tested.",
        "QA example: hold one disputed charge while leaving another charge active. Verify which invoicing or collection actions are paused and that unrelated obligations continue as required.",
        "Test permission to place or release a hold, repeated release and processing at the release boundary. Capture the original reason and audit evidence so the pause can be explained later."
      ],
      "q": "What should you clarify before automating a hold scenario?",
      "a": "I need to know the held object, prohibited operations, permitted exceptions and release conditions. I would then verify both the paused obligation and a control obligation that should continue. I would not interpret an account search flag as proof that every charge is blocked.",
      "practice": "Write a scope table showing what may and may not proceed while one charge is disputed.",
      "source": [
        "Guidewire · Account search and charge holds",
        "https://docs.guidewire.com/cloud/bc/202511/cloudapibf/cloudAPI/topics/132-BCBilling/accounts/c_search-accounts.html"
      ]
    },
    {
      "title": "Currency compatibility and plan selection",
      "intro": "Currency is part of a financial value and a plan’s eligibility; matching numbers without matching currency is unsafe.",
      "points": [
        "Plan support and payer-account currency must be compatible. Mono-currency and multicurrency deployments can impose different restrictions, so record the environment’s mode before testing.",
        "QA example: attempt to use a plan that does not support the account currency, then compare a valid combination. Assert both amount and currency on charges, invoices and payment-related records.",
        "Include decimal precision, display formatting and currency-specific thresholds. Do not invent an exchange conversion when the integration contract expects rejection or a matching-currency transaction."
      ],
      "q": "How would you avoid a false pass in a multicurrency test?",
      "a": "I would assert the currency code alongside every monetary amount and verify the applicable plan and threshold currency. For conversions, I would require an approved rate source and timing rule. If conversion is not supported for the operation, I would verify rejection instead.",
      "practice": "Create three combinations of account currency and supported plan currencies, including one invalid selection.",
      "source": [
        "Guidewire · Issuing policies",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/BillingCenter/billing/policies/c_issuing-policies.html"
      ]
    }
  ],
  "policycenter": [
    {
      "title": "Accounts, policies and jobs: three different identities",
      "intro": "An account represents the customer relationship, a policy represents insurance business, and a job represents work on that policy.",
      "points": [
        "Use separate account, policy and job identifiers in your test evidence. A customer can have multiple policies, and a policy can accumulate multiple transactions over time.",
        "Start with two policies on the same account. Changing one policy must affect only the intended business scope; shared account information may have different propagation rules.",
        "Verify search results and links resolve to the correct record. Similar names, renewed terms and unfinished jobs are useful cases for detecting accidental selection of the wrong object."
      ],
      "q": "Why is a job number not interchangeable with a policy number?",
      "a": "A job identifies a transaction such as a submission or change, while the policy number identifies the insurance policy. I retain both so I can trace the change and its resulting policy state. I also record the term and effective date, because the same policy can have several historical versions.",
      "practice": "Create an evidence table containing account ID, policy number, job ID, term dates and transaction effective date.",
      "source": [
        "Guidewire · Modifying jobs",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-policies/overview-of-modifying-jobs.html"
      ]
    },
    {
      "title": "Account contacts and policy contact roles",
      "intro": "A person or company can participate in the customer relationship and in a particular policy through different roles.",
      "points": [
        "Distinguish the contact identity from its relationship to an account or policy. The primary named insured and an additional insured are roles, not necessarily separate people.",
        "Test adding an existing contact to a policy instead of always creating a new contact. Check that role changes do not produce duplicate identities or overwrite unrelated contact information.",
        "Validate role eligibility, required contact details and permitted removal. Use two policies sharing a contact to check which changes should remain local and which should be reflected elsewhere."
      ],
      "q": "How would you test adding an additional insured?",
      "a": "I would use an existing eligible contact, assign the intended role and verify that it appears on the correct policy and applicable forms. I would check duplicate-role handling, invalid contact types and removal rules. I would inspect another policy sharing the contact to detect unintended cross-policy changes.",
      "practice": "Design positive and negative cases for one contact holding multiple permitted policy roles.",
      "source": [
        "Guidewire · Policy contacts",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/accounts/managing-bound-policies/c_policy_contacts.html"
      ]
    },
    {
      "title": "Product definitions and lines of business",
      "intro": "The product design determines the insurance choices a tester should expect; one product can involve different line structures.",
      "points": [
        "Map the product to its applicable lines, risk objects and coverage choices. Do not copy a Personal Auto test structure into a commercial product without checking its model.",
        "Use a product-and-jurisdiction matrix to select representative scenarios. Eligibility, availability and default selections should be traced to the version of the product definition under test.",
        "Check both displayed choices and persisted selections. A hidden unsupported line is insufficient if an API or stale saved job can still introduce it contrary to the rules."
      ],
      "q": "How does the product model affect your test design?",
      "a": "It tells me which risks, coverages, terms and questions are valid for the product. I turn those relationships into coverage and validation cases, then test representative combinations. I keep product-specific assumptions visible so a reusable automation helper does not force all lines into the same structure.",
      "practice": "Sketch a simple product tree showing a line, two risk objects and their possible coverages.",
      "source": [
        "Guidewire · Coverables and coverages",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-policies/coverables-and-coverages.html"
      ]
    },
    {
      "title": "Coverables and automatically created child data",
      "intro": "A coverable is an insurable object, such as a vehicle or building, whose creation can bring related data into the job.",
      "points": [
        "Identify the coverable hierarchy for your line of business. A parent and its child objects may have different required fields and different lifecycle rules.",
        "Check default child creation against the product settings. Required or suggested available coverages may be created automatically; do not assume every optional coverage should appear.",
        "Test an incomplete object at creation and again at quote. Data accepted during initial entry may be insufficient for a later validation stage, so record the expected stage of each failure."
      ],
      "q": "Can a coverable be created successfully but still prevent quoting?",
      "a": "Yes. Some validations are deferred until the job reaches a later stage. I would verify that the object was saved correctly, then check that quoting reports the missing required information clearly. Once the missing data is supplied, I would verify the expected defaults and quote outcome.",
      "practice": "Write a vehicle-data case that saves a draft but fails quote validation until required information is completed.",
      "source": [
        "Guidewire · Adding coverables",
        "https://docs.guidewire.com/cloud/pc/202411/cloudapibf/cloudAPI/topics/123-PCpolicies/02-coverables-and-coverages/c_adding_coverables.html"
      ]
    },
    {
      "title": "Coverage availability, existence and selection",
      "intro": "Whether a coverage can be offered, should be created by default and is selected are separate questions.",
      "points": [
        "Build cases for a coverage available in one product or jurisdiction but unavailable in another. Include the relevant effective-date boundary when product availability changes.",
        "Check required, suggested and optional behavior against configured product rules. A default selection should not be mistaken for a requirement that the user cannot change.",
        "Change a risk attribute after selecting coverage and revalidate the job. Define what happens if a previously valid selection becomes unavailable, including messages and downstream forms."
      ],
      "q": "How would you test a coverage that becomes unavailable after editing the risk?",
      "a": "I would first quote a valid combination, then change the relevant risk attribute. I would check the configured response: removal, a validation issue or another defined action. I would verify that stale selections do not survive into the bound policy, premium or forms contrary to requirements.",
      "practice": "Create a decision table for coverage availability by jurisdiction, risk type and effective date.",
      "source": [
        "Guidewire · Adding coverables",
        "https://docs.guidewire.com/cloud/pc/202411/cloudapibf/cloudAPI/topics/123-PCpolicies/02-coverables-and-coverages/c_adding_coverables.html"
      ]
    },
    {
      "title": "Coverage terms: limits, deductibles and option choices",
      "intro": "A coverage term further specifies protection, such as a limit, deductible or permitted option within a coverage.",
      "points": [
        "Determine whether the term accepts a direct value or a defined option. Validate units, currency, allowed values and defaults rather than relying only on its displayed label.",
        "Test minimum, maximum and invalid combinations using approved product rules. A deductible accepted alone may be invalid when paired with a particular coverage limit.",
        "After saving and quoting, read the values back and inspect relevant output. Confirm the chosen option was persisted rather than replaced by a default during synchronization."
      ],
      "q": "What assertions would you make for a deductible change?",
      "a": "I would verify the selected value, its unit or currency and its compatibility with the coverage. Then I would compare the approved premium result and applicable document output. I would include a reload and a subsequent transaction to confirm that the intended value persists.",
      "practice": "Prepare a limit-versus-deductible matrix containing two valid combinations and two invalid ones.",
      "source": [
        "Guidewire · Coverables and coverages",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-policies/coverables-and-coverages.html"
      ]
    },
    {
      "title": "Conditions and exclusions: beyond coverage selection",
      "intro": "A policy can contain contractual conditions and exclusions that affect its meaning without behaving like an ordinary coverage.",
      "points": [
        "An exclusion describes circumstances outside the covered scope. A condition states an obligation or contractual requirement. Confirm the actual product wording with approved specifications.",
        "Test availability, selection and removal rules separately from the premium assertion. A change can be important even when the quoted amount does not change.",
        "Verify the corresponding forms and policy presentation. Ensure users cannot accidentally retain an exclusion from an earlier risk configuration when the current product rules no longer permit it."
      ],
      "q": "Why would you test an exclusion even if it has no premium impact?",
      "a": "Because correctness includes the policy terms, not just the price. I would confirm the exclusion is allowed, selected intentionally and represented in the required forms. I would also test its removal and the consequences of changing a related risk attribute.",
      "practice": "Design a case in which an exclusion changes policy wording while the expected premium stays the same.",
      "source": [
        "Guidewire · Modifying jobs",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-policies/overview-of-modifying-jobs.html"
      ]
    },
    {
      "title": "Exposures and rating-relevant risk information",
      "intro": "Some product objects supply information used to process or rate a policy without being the object to which coverage is attached.",
      "points": [
        "Identify the difference between the insured object and supporting exposure data. In a vehicle example, driver information can affect pricing without making the driver a vehicle coverable.",
        "Test associations and cardinality: the right person or exposure must relate to the right risk. Include reassignment and removal, especially where several vehicles or locations are present.",
        "Use controlled changes to one exposure attribute and compare approved rating or eligibility outcomes. Preserve the rest of the dataset so the cause of a difference is clear."
      ],
      "q": "How would you investigate a premium change after adding a driver?",
      "a": "I would compare the driver details and risk associations before and after the change, then inspect the relevant rating inputs against the approved reference. I would check that the driver was not duplicated or applied to an unintended vehicle, and verify whether an underwriting rule also changed the outcome.",
      "practice": "Build a two-vehicle example that detects a driver being associated with the wrong vehicle.",
      "source": [
        "Guidewire · Modifying jobs",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-policies/overview-of-modifying-jobs.html"
      ]
    },
    {
      "title": "Rate modifiers and discount scope",
      "intro": "A modifier can adjust premium at a product, line or object scope, depending on the product design.",
      "points": [
        "Identify the intended scope before calculating expected results. A line-level discount should not automatically be assumed to affect every line in a package policy.",
        "Test eligibility, default values, boundary values and combinations of modifiers. Confirm the approved treatment when two discounts or surcharges apply together.",
        "Change the supporting risk information and verify the modifier remains valid. Check quoted and persisted values, not merely the presence of a discount label on the screen."
      ],
      "q": "How would you test a multi-policy discount?",
      "a": "I would confirm the eligibility rule, eligible product scope and approved expected adjustment. I would test an eligible account, an ineligible account and a case where eligibility is later lost. I would verify that the adjustment affects the correct costs and is not applied twice after requoting.",
      "practice": "Create a discount matrix for two lines, including a scenario where only one line should be adjusted.",
      "source": [
        "Guidewire · Modifiers",
        "https://docs.guidewire.com/cloud/is/202607/cloudapibf/cloudAPI/PolicyCenter/job-policies/modifiers.html"
      ]
    },
    {
      "title": "Qualification questions and dependent answers",
      "intro": "Questions collect information for eligibility, underwriting or rating, and their answer types and dependencies need deliberate coverage.",
      "points": [
        "Validate Boolean, choice, date, number and text responses using their intended types. An unanswered optional question is different from an explicit false or zero answer.",
        "Change a parent answer that reveals or hides dependent questions. Agree whether prior child answers must be cleared, retained or ignored, then verify that behavior after save and reload.",
        "Check that the job and bound-policy views present the correct answers. Include unsupported choice codes, invalid dates and missing required answers at the relevant validation stage."
      ],
      "q": "What is an important negative case for a dependent question?",
      "a": "I would enter a child answer, change the parent so the child is no longer applicable, and then quote the job. I would confirm that stale child data does not influence eligibility or rating incorrectly. The expected clearing or retention behavior should be defined by the product requirements.",
      "practice": "Design tests distinguishing an unanswered Boolean question from an explicit “No” response.",
      "source": [
        "Guidewire · Policy questions",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/accounts/managing-bound-policies/c_policy_questions.html"
      ]
    },
    {
      "title": "Policy locations and historical address accuracy",
      "intro": "Location information may be shared during a job but must be understood in the context of a particular policy and time.",
      "points": [
        "Separate the customer’s account location from the location represented on the policy. A later account-address edit should not be assumed to rewrite historical policy information.",
        "Use two locations with clearly different rating-relevant attributes. Test adding, selecting and removing the intended location, including its association with individual risks.",
        "Verify address changes at the correct transaction date and inspect downstream output. Avoid using only city names as identifiers when different locations can share a city or postal code."
      ],
      "q": "How would you test a change to a garaging address?",
      "a": "I would identify the policy location and transaction effective date, make the change through the permitted job and verify the associated vehicle. I would check approved rating and document changes and inspect an earlier policy view to make sure the historical address remains correct for that period.",
      "practice": "Prepare before-and-after address expectations for the day before and day of a midterm move.",
      "source": [
        "Guidewire · Policy locations (Cloud API Consumer Guide, 2024.07)",
        "https://docs.guidewire.com/cloud/pc/202407/cloudapibf/pdf/CloudAPI-Consumer.pdf"
      ]
    },
    {
      "title": "Producer codes and access boundaries",
      "intro": "Producer codes connect policies with producers and can also participate in controlling which policies users can access.",
      "points": [
        "Use two producers and separate policy datasets. Validate available producer-code choices and confirm the selected code belongs to the intended producer relationship.",
        "Where producer-code security is enabled, test search, direct record access and supported APIs. Hiding a policy in a search list does not prove access is enforced elsewhere.",
        "Test inactive or unavailable selections and changes during a transaction according to the implementation. Verify that changing service responsibility does not unintentionally alter other producer-related values."
      ],
      "q": "How would you test producer-code security?",
      "a": "I would create users with distinct producer-code access and policies associated with each code. I would test permitted access and attempts to retrieve another producer’s policy directly. I would verify consistent authorization across UI and APIs and check the relevant group membership configuration when a result is unexpected.",
      "practice": "Create a user-versus-policy access matrix with one shared group and one restricted producer.",
      "source": [
        "Guidewire · Producer codes",
        "https://docs.omega2-andromeda.guidewire.net/cloud/is/202607/cloudapibf/cloudAPI/PolicyCenter/framework/producers/c_producer-codes.html"
      ]
    },
    {
      "title": "Underwriting issue blocking points",
      "intro": "Underwriting issues can prevent progress at different stages; the point of blocking is part of the expected behavior.",
      "points": [
        "Classify each tested issue as informational or blocking at a defined stage such as quote, bind or issue. Do not treat every warning as a hard block.",
        "Seed values on both sides of a rule threshold and record the issue type, explanatory message and affected stage. A message alone does not prove enforcement.",
        "After correcting the risk, verify the issue is reevaluated as specified. Check that the user cannot bypass a blocking issue through an alternate action or supported API route."
      ],
      "q": "How would you distinguish a quote block from a bind block?",
      "a": "I would attempt each permitted lifecycle action with the same controlled issue present and compare the result with the rule specification. A bind-blocking issue may permit a quote but prevent commitment. I would verify the issue state and message as well as the resulting job state.",
      "practice": "Write a matrix showing allowed and blocked actions for informational, quote-blocking and bind-blocking issues.",
      "source": [
        "Guidewire · Underwriting issues",
        "https://docs.guidewire.com/cloud/pc/202511/cloudapibf/cloudAPI/topics/124-PCsupport/00-underwriting-issues/c_underwriting_issues_in_policycenter.html"
      ]
    },
    {
      "title": "Underwriting approval authority and referral",
      "intro": "Finding an issue and having authority to approve it are separate capabilities that should be tested separately.",
      "points": [
        "Identify the issue types and value conditions that each test user can approve. Include a value at the authority boundary and one beyond it.",
        "Test approval requests and the handoff to an appropriate reviewer. Verify the issue remains blocked until the required authorized action completes.",
        "Change relevant risk information after approval and check the configured validity of that approval. A prior approval should not be assumed to cover every later change."
      ],
      "q": "How would you test an underwriting authority limit?",
      "a": "I would use users with different grants and create otherwise identical issues at and beyond the defined limit. I would check that approval succeeds only for the permitted scope, that unauthorized attempts fail and that escalation preserves the issue context. I would then vary the approved risk to test reevaluation.",
      "practice": "Create three approval cases: inside authority, exactly at the boundary and outside authority.",
      "source": [
        "Guidewire · Underwriting issues",
        "https://docs.guidewire.com/cloud/pc/202511/cloudapibf/cloudAPI/topics/124-PCsupport/00-underwriting-issues/c_underwriting_issues_in_policycenter.html"
      ]
    },
    {
      "title": "Referral reasons and pre-renewal review signals",
      "intro": "Information discovered while a policy is in force may need to influence a later transaction rather than an active submission.",
      "points": [
        "Distinguish a policy-level referral reason from an underwriting issue on a job. Record what information should trigger review when the next relevant job begins.",
        "Test adding, updating and clearing a referral signal using approved permissions. Verify the affected policy, explanatory details and any expected future review behavior.",
        "Create the next eligible transaction and inspect whether the configured issue or review task is generated once. Include a cleared signal so obsolete concerns do not continue to block processing."
      ],
      "q": "Why might a referral reason exist before an underwriting issue?",
      "a": "A concern can be recorded on an in-force policy when no transaction is active. The next relevant job can use that concern to trigger review according to its rules. I would test both the stored policy signal and the later job behavior, including clearing and duplicate-generation cases.",
      "practice": "Design a renewal-review scenario based on new information discovered halfway through the current term.",
      "source": [
        "Guidewire · Underwriting issues",
        "https://docs.guidewire.com/cloud/pc/202511/cloudapibf/cloudAPI/topics/124-PCsupport/00-underwriting-issues/c_underwriting_issues_in_policycenter.html"
      ]
    },
    {
      "title": "Rating inputs, costs and premium evidence",
      "intro": "A premium result is easier to validate when the test connects risk inputs to the cost breakdown and final presentation.",
      "points": [
        "Keep approved expected results outside the application calculation under test. Record risk data, term dates, relevant rating configuration and the expected cost components.",
        "Change one rating-relevant input at a time. Compare component values and totals to identify the first divergence instead of reporting only a final-price mismatch.",
        "Include rounding, currency and partial-period cases relevant to the product. Repeated quoting with unchanged inputs should follow the documented deterministic behavior and not accumulate adjustments."
      ],
      "q": "What evidence makes a rating defect actionable?",
      "a": "I provide the exact input dataset, applicable dates and rating configuration, approved expected components and actual cost breakdown. This helps distinguish wrong inputs from incorrect calculation or presentation. I also show a small comparison case where only one factor differs so the suspected boundary is reproducible.",
      "practice": "Prepare a rating evidence sheet with three input changes and independently approved expected premiums.",
      "source": [
        "Guidewire · Quoting",
        "https://docs.guidewire.com/cloud/pc/202511/cloudapibf/cloudAPI/topics/124-PCsupport/00-quoting/c_quoting.html"
      ]
    },
    {
      "title": "Rating overrides and controlled exceptions",
      "intro": "An override is an intentional exception to a calculated rating value and needs its own authority and audit coverage.",
      "points": [
        "Identify which cost values can be overridden and by whom in the project. Do not assume every displayed amount is editable or that one permission covers all overrides.",
        "Verify the override reason, entered value, resulting premium and visible distinction from the original calculation. Test invalid values and unauthorized requests.",
        "Requote and make a later risk change to determine whether the override persists, expires or requires review under the configured rules. Check any downstream billing effect."
      ],
      "q": "How would you test a manual rating override?",
      "a": "I would capture the original cost, apply an authorized override with a reason and verify the resulting amount and audit record. I would test unauthorized access and invalid values. Then I would requote and change a relevant input to verify the defined lifetime of the override.",
      "practice": "Create an override test that distinguishes calculated value, overridden value and the final billed adjustment.",
      "source": [
        "Guidewire · Rating overrides",
        "https://docs.guidewire.com/cloud/pc/202507/cloudapibf/cloudAPI/topics/124-PCsupport/00-quoting/c_rating_overrides.html"
      ]
    },
    {
      "title": "Effective-dated values and time-slice testing",
      "intro": "A policy field can be correct on one date and incorrect on another; a single current-screen assertion is insufficient.",
      "points": [
        "Build a timeline with the policy term and every change effective date. For each boundary, define the risk and coverage values expected immediately before and after it.",
        "Inspect date-specific policy views using supported project mechanisms. Confirm whether the business definition uses dates or timestamps and how time zones are treated.",
        "Check related values together: an added vehicle, its coverage terms and premium effect must correspond to the same intended period. Current values must not overwrite earlier evidence."
      ],
      "q": "How would you test two midterm deductible changes?",
      "a": "I would choose dates that divide the term into three intervals and specify the expected deductible in each. After both transactions complete, I would read the policy at each boundary and compare premiums and output. I would also test the term start and end to catch interval mistakes.",
      "practice": "Draw three policy intervals and label the deductible expected in each after two changes.",
      "source": [
        "Guidewire · Out-of-sequence conflicts",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-support/OOS-conflicts.html"
      ]
    },
    {
      "title": "Out-of-sequence changes and conflict resolution",
      "intro": "An out-of-sequence change is entered later but takes effect before another already processed change on the same policy.",
      "points": [
        "Use separate transaction-entry and effective dates in the test dataset. Merely entering jobs in a different order does not demonstrate an effective-date conflict.",
        "Create an earlier-effective change that touches a value also changed later. Inspect the detected conflict and the choices offered by the configured resolution flow.",
        "After resolution, validate every affected interval and the future-effective values. Check both the accepted earlier change and preservation of intended later changes."
      ],
      "q": "How would you test an out-of-sequence endorsement?",
      "a": "I would first complete a later-effective change, then enter a change effective before it that affects the same data. I would verify conflict detection, choose the business-approved resolution and inspect the complete timeline. I would also check premium adjustments and integration output for the corrected periods.",
      "practice": "Design an example with a June change entered first and an April change entered afterwards.",
      "source": [
        "Guidewire · Out-of-sequence conflicts",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-support/OOS-conflicts.html"
      ]
    },
    {
      "title": "Concurrent jobs and preemption",
      "intro": "Preemption concerns concurrent work based on the same policy state when another job is completed first.",
      "points": [
        "Start two changes from the same base policy and modify different risks. Complete one, then return to the other and inspect the preemption handling required by the project.",
        "Verify that resolving preemption brings forward the first job’s changes without silently discarding the second user’s intended work. Include a case where both jobs edit the same field.",
        "Distinguish this concurrency problem from an out-of-sequence effective-date problem. A scenario can involve both, but its expected conflict behavior needs separate evidence."
      ],
      "q": "How is preemption different from an out-of-sequence change?",
      "a": "Preemption arises when a concurrent job’s base policy becomes outdated because another job completes first. Out-of-sequence processing concerns effective-date ordering. I test the two independently, then add a combined scenario if supported, verifying both the merged data and the resulting dated policy intervals.",
      "practice": "Start one job adding a vehicle and another changing a limit; define the final policy after resolving preemption.",
      "source": [
        "Guidewire · Preemptions",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-types/policy-changes/c_preemptions.html"
      ]
    },
    {
      "title": "Renewal preparation and carry-forward rules",
      "intro": "Renewal preparation determines which current-term information is carried into the next term and what must be reconsidered.",
      "points": [
        "Choose a policy with distinctive risks, contacts, coverage terms and a midterm change. Identify which values should carry forward and which should be reset or recalculated.",
        "Check the next term’s dates and applicable product or rating configuration. A correctly copied field can still be invalid for the new term.",
        "Test an automatically progressing renewal and a renewal requiring intervention according to the configured workflow. Include a material change that requires editing and requoting."
      ],
      "q": "What would you verify beyond the renewal premium?",
      "a": "I would inspect term continuity, carried-forward risks, coverage selections, contacts and required reevaluation. I would confirm that next-term rules apply and that obsolete values are handled correctly. I would also check the renewal workflow, notices and billing output relevant to the implementation.",
      "practice": "Create a carry-forward checklist for a policy with an added midterm vehicle and an expiring discount.",
      "source": [
        "Guidewire · Initiating a renewal",
        "https://docs.guidewire.com/cloud/is/202607/cloudapibf/cloudAPI/PolicyCenter/job-types/renewals/c_initiating_a_renewal.html"
      ]
    },
    {
      "title": "Pre-renewal directions and nonrenewal paths",
      "intro": "A renewal can require special handling rather than automatically continuing into another term.",
      "points": [
        "Identify the supported pre-renewal direction or nonrenewal workflow and its authorized roles. Record the expected review, notice and timing requirements from the project specification.",
        "Test setting and clearing the direction before renewal initiation. Check how the renewal workflow responds, including whether manual review or a different outcome is required.",
        "Verify that an adverse renewal outcome does not accidentally alter the current term’s coverage. Check communications and downstream states independently of a screen status."
      ],
      "q": "How would you test a policy marked for nonrenewal?",
      "a": "I would verify the permitted action, reason and effective timing, then follow the configured renewal process. I would check review and notice requirements and confirm the current term remains correct. I would also test reversal of the direction before the relevant cutoff using approved business rules.",
      "practice": "Write a test separating current-term coverage from the decision not to offer the next term.",
      "source": [
        "Guidewire · Initiating a renewal",
        "https://docs.guidewire.com/cloud/is/202607/cloudapibf/cloudAPI/PolicyCenter/job-types/renewals/c_initiating_a_renewal.html"
      ]
    },
    {
      "title": "Cancellation dates, reasons and return-premium checks",
      "intro": "Cancellation testing requires the relationship between the termination date, reason and financial treatment to be explicit.",
      "points": [
        "Use approved cancellation rules for allowed dates and reasons. Include future, same-day and earlier dates only where the implementation permits them.",
        "Calculate expected financial effects using the insurer’s specified method. Do not assume every cancellation uses the same proration, fee or minimum-premium treatment.",
        "Verify the policy timeline, generated communication and billing instruction. A cancellation request awaiting processing must not be mistaken for a completed termination."
      ],
      "q": "What are the most important boundaries in cancellation testing?",
      "a": "I would include the policy start, a midterm date, the expiration boundary and any configured notice or processing cutoff. For each, I would verify eligibility and financial treatment from approved rules. I would check the resulting coverage period and downstream billing rather than only the cancellation status.",
      "practice": "Build a cancellation matrix with three effective dates and two permitted reasons, including expected financial treatment.",
      "source": [
        "Guidewire · Cancellations and reinstatements",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-types/cancellations-reinstatements.html"
      ]
    },
    {
      "title": "Reinstatement and restoration of policy state",
      "intro": "Reinstatement returns a canceled policy to an active insurance state through a controlled transaction.",
      "points": [
        "Confirm that the policy is eligible and that the reason and timing satisfy project rules. Test an ineligible policy and an unauthorized user as well as the valid case.",
        "Compare the reinstated risks, coverages and dates with the intended prior state. Determine whether any permitted fees or other adjustments change the quote.",
        "Inspect billing and communication output and repeat the request where supported. A duplicate action must not create a second unintended restoration or charge."
      ],
      "q": "What would you compare before cancellation and after reinstatement?",
      "a": "I would compare the policy’s risks, coverages, effective dates and relevant financial components against the approved expected restored state. I would identify any legitimate reinstatement fee separately. I would then trace billing updates and verify that historical cancellation and reinstatement records remain understandable.",
      "practice": "Create a before-cancellation, canceled and reinstated comparison table for one policy.",
      "source": [
        "Guidewire · Reinstatements",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-types/cancellations-reinstatements/c_reinstatements.html"
      ]
    },
    {
      "title": "Rewrite types and rewrite to a new account",
      "intro": "A rewrite creates replacement policy business from an existing policy; it is not interchangeable with a routine endorsement.",
      "points": [
        "Identify whether the scenario concerns the full term, a new term, the remaining term or a rewrite to another account. The permitted process and financial consequences differ.",
        "Record the original and resulting policy relationships, term dates and account ownership. For a new-account rewrite, verify what moves forward and what remains in historical records.",
        "Compare copied risks and corrected information, then verify cancellation prerequisites and output required by the project. Check that documents describe the intended replacement contract."
      ],
      "q": "How would you test a rewrite to a new account?",
      "a": "I would trace the source policy, destination account and resulting policy identity, then compare the intended copied and corrected information. I would confirm that prior history stays associated with the appropriate original records and that new-term or remaining-term coverage, billing and forms use the intended destination.",
      "practice": "Prepare a rewrite checklist that explicitly records both old and new policy/account identifiers.",
      "source": [
        "Guidewire · Rewrite and Rewrite New Account",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-types/rewrites.html"
      ]
    },
    {
      "title": "Form inference and policy-document selection",
      "intro": "PolicyCenter determines which form patterns apply; the existence of a form entry is separate from delivery of the physical document.",
      "points": [
        "Build a small matrix of risk attributes, coverage selections and jurisdictions that change expected form selection. Compare form identifiers and editions against approved examples.",
        "Inspect the applicable inference stage. Some information becomes available only at bind or issuance, so a quote-stage list need not always match the final list.",
        "Validate the actual generated document through the configured document integration as a separate checkpoint. Correct form metadata does not prove correct rendering, attachment or delivery."
      ],
      "q": "Why might the form list change between quoting and binding?",
      "a": "Some forms depend on information available only at a later stage. I would compare the expected inference timing and inputs for each form rather than requiring the lists to be identical. I would then verify that the final physical output uses the correct form and edition.",
      "practice": "Create a form-selection matrix with one quote-stage form and one form expected only at a later stage.",
      "source": [
        "Guidewire · Policy and job forms",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-support/form-patterns/c_policy-and-job-forms.html"
      ]
    },
    {
      "title": "Form editions, jurisdiction and availability dates",
      "intro": "A familiar form name can hide the wrong edition or a form that is not valid for the policy’s jurisdiction and date.",
      "points": [
        "Track form identity, edition and relevant availability dates separately. Use approved form-pattern configuration to select an example just before and at a change boundary.",
        "Test two jurisdictions with different availability and verify required replacements. Do not infer the correct form solely from its visible title or a matching PDF filename.",
        "Check a policy change and renewal when the form version changes. Define which edition should appear in each transaction without assuming historical documents must be regenerated."
      ],
      "q": "How would you catch an outdated form edition in regression testing?",
      "a": "I would use a dated policy scenario that crosses the form availability boundary and assert both the form identifier and edition. I would include a jurisdiction control case and compare generated document metadata. Historical documents would be assessed against their original applicable rules.",
      "practice": "Design boundary cases for a form edition effective on 1 July and an older edition used before that date.",
      "source": [
        "Guidewire · Form patterns",
        "https://docs.guidewire.com/cloud/pc/202507/cloudapibf/cloudAPI/topics/124-PCsupport/00-form-patterns/c_form-patterns.html"
      ]
    },
    {
      "title": "Premium audits and estimated versus actual exposure",
      "intro": "Auditable products may replace estimated exposure measures with actual values and adjust the premium accordingly.",
      "points": [
        "Identify whether the product supports an audit or premium report and which exposure basis it uses, such as payroll. Audit availability depends on line configuration.",
        "Test the reporting interval, entered actual values and approved recalculation. Include missing reports, zero values and corrected information according to supported business rules.",
        "Reconcile the adjustment sent to billing with the policy result. Distinguish an audit of insurance exposure from the system’s history or security audit trail."
      ],
      "q": "How would you test a final premium audit?",
      "a": "I would start with a policy rated on known estimates, enter approved actual exposure values for the correct interval and compare the recalculated premium. I would verify the adjustment and billing instruction, including credits where applicable, and retain the original estimate and revised values as evidence.",
      "practice": "Build an example with estimated payroll, actual payroll and an independently approved premium adjustment.",
      "source": [
        "Guidewire · Audits",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-types/audits.html"
      ]
    },
    {
      "title": "Policy-to-billing instructions and reconciliation",
      "intro": "Policy transactions and billing effects must be traced across a system boundary using business identifiers and expected amounts.",
      "points": [
        "For a selected transaction, record policy number, term, job, effective date, premium change and expected billing event. Confirm the actual integration design and message contract.",
        "Verify both successful receipt and the resulting billing state. An outbound event or successful transport acknowledgment does not alone prove the balance and schedule are correct.",
        "Test duplicate delivery, delayed processing and a receiver failure using approved test controls. Reconcile the final financial effect and preserve correlation identifiers for investigation."
      ],
      "q": "How would you test an audit adjustment reaching BillingCenter?",
      "a": "I would capture the completed audit’s expected adjustment and trace its billing instruction to the receiver. I would verify the correct policy period, amount and resulting billing treatment. I would then test a retry and confirm that the financial effect is not duplicated and that failures remain visible.",
      "practice": "Create a reconciliation table with source transaction, message reference, receiver status and expected balance effect.",
      "source": [
        "Guidewire · Policy audit billing instructions",
        "https://docs.guidewire.com/cloud/bc/202511/cloudapibf/cloudAPI/topics/132-BCBilling/policies/c_policy-audits.html"
      ]
    },
    {
      "title": "Risk history, migration and release regression evidence",
      "intro": "Prior policies and loss history provide risk context, while migrations and upgrades must preserve the meaning of existing policy data.",
      "points": [
        "Test risk-history entry with clear dates, amounts and external references. Check duplicate history, missing details and which information may be edited inside or outside a job.",
        "For migration or an upgrade, select representative policy states and product combinations. Compare business identifiers, dated coverage, contacts, premium values and history through supported read-only interfaces.",
        "Run targeted post-upgrade transactions on copied test records. A successful row-count comparison does not prove an imported policy can be renewed, changed or viewed correctly by authorized users."
      ],
      "q": "How would you prove a migrated policy is usable?",
      "a": "I would reconcile its critical business data and timeline against the source, verify access and inspect its risk history. Then I would execute a supported representative transaction in the test environment and compare the expected result. I would report rejected or transformed records separately rather than hiding them within aggregate counts.",
      "practice": "Choose five policy samples for migration testing and explain the business risk represented by each.",
      "source": [
        "Guidewire · Modifying the submission",
        "https://docs.guidewire.com/cloud/is/202603/cloudapibf/cloudAPI/PolicyCenter/job-types/submissions/c_modifying-the-submission.html"
      ]
    }
  ]
};

for (const [topicId, additions] of Object.entries(GUIDEWIRE_CONCEPTS)) {
  const topic = TOPICS.find(t => t.id === topicId);
  const offset = topic.lessons.length;
  additions.forEach((item, index) => {
    const lesson = { ...item, code: '', language: '', id: topicId + '-' + (offset + index + 1), topic: topicId };
    lesson.minutes = Math.max(3, Math.ceil([lesson.intro, ...lesson.points, lesson.a, lesson.practice].join(' ').split(/\s+/).length / 160) + 2);
    topic.lessons.push(lesson);
  });
}
