// Original interview study material. Examples are illustrative, not product specifications.
const SOURCES={guidewire:['Guidewire · InsuranceSuite','https://www.guidewire.com/products/core-products'],selenium:['Selenium · Waiting strategies','https://www.selenium.dev/documentation/webdriver/waits/'],playwright:['Playwright · Best practices','https://playwright.dev/docs/best-practices'],testng:['TestNG · Documentation','https://testng.org/'],java:['Java · Learning resources','https://dev.java/learn/'],api:['Postman · Response tests','https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/'],sql:['PostgreSQL · SQL tutorial','https://www.postgresql.org/docs/current/tutorial-sql.html'],git:['Git · Version control','https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control'],cicd:['GitLab · CI/CD documentation','https://docs.gitlab.com/ci/']};
function L(title,intro,points,q,a,practice,code='',language=''){return{title,intro,points,q,a,practice,code,language};}
const TOPICS=[
{id:'claimcenter',name:'ClaimCenter',group:'Guidewire',icon:'CC',color:'#7a67c6',tint:'#eee9fa',desc:'From first notice of loss to claim closure. Learn the complete claims journey.',source:'guidewire',lessons:[
L('The claim lifecycle & FNOL','Connect the insurance process to a testable claim journey. First notice of loss (FNOL) is the initial reporting of a loss.',[
'Build a scenario around an insured, policy, loss date, loss location and loss description. Define the expected policy match and coverage review outcome before execution.',
'Use an illustrative journey: FNOL → claim setup and assignment → investigation → financial activity → resolution and closure. Exact steps and validation rules depend on configuration.',
'Test invalid loss dates, missing mandatory details, duplicate reporting and unauthorized access. Check persisted data and audit evidence alongside the visible confirmation.'
],'How would you test FNOL?','I would start with a valid policy and controlled loss date, submit the minimum required claim details, and verify the created claim, policy association and assignment. I would then vary mandatory fields, policy matching, coverage dates and permissions. I would retain the claim identifier and integration evidence for investigation.','Write five FNOL cases: one happy path, two boundary cases, one permission case and one duplicate-submission case.'),
L('Exposures, reserves & payments','Translate claim financial concepts into precise checks. Do not treat a reserve as a payment.',[
'A claim can contain exposures representing particular potential obligations for a coverage and claimant. Confirm the configured relationship between claim, exposure, coverage and contact.',
'A reserve estimates an expected financial obligation; a payment records a disbursement. Test amounts, currencies, approval authority and transaction states against the agreed requirements.',
'For each financial operation, check permitted transitions, totals, approval routing and duplicate prevention. Reconcile using configured financial definitions, rather than assuming that all displayed totals are simple sums.'
],'What is the difference between a reserve and a payment?','A reserve represents an estimate of what may need to be paid; a payment is a disbursement transaction. I would test their lifecycle and approval rules separately, then verify how the configured financial summaries change. A successful payment screen alone does not prove downstream processing succeeded.','Design a reserve-change and payment-approval test matrix with permitted and prohibited user roles.'),
L('A resilient ClaimCenter regression strategy','Choose a small set of business-critical journeys, then move detailed rule coverage to the most appropriate test layer.',[
'Keep a UI smoke path for claim creation, search and navigation. Use supported APIs or controlled fixtures for setup where your environment permits them.',
'Cover assignment rules, financial approval boundaries, document associations and close/reopen conditions with explicit expected outcomes agreed with the business analyst.',
'For asynchronous integrations, capture correlation identifiers and poll an observable state with a timeout. Distinguish application defects from unavailable test environments.'
],'How do you investigate a claim created in the UI but missing downstream?','I would capture the claim and correlation identifiers, verify the source transaction committed, inspect outbound message state and the receiver response, then check transformation, retry and duplicate-handling behavior. I would report the failing boundary with timestamps and payload evidence.','Create a regression shortlist of ten cases and explain which belong in UI, API or integration testing.') ]},
{id:'billingcenter',name:'BillingCenter',group:'Guidewire',icon:'BC',color:'#b5853d',tint:'#fbf1dd',desc:'Understand invoices, payments, billing plans and delinquency workflows.',source:'guidewire',lessons:[
L('Accounts, charges & invoices','Follow the movement from a billing instruction to an amount due.',[
'An account organizes billing relationships. Policy-related charges feed the configured billing process; invoices present amounts due according to the selected billing plan.',
'Create an example with a known premium, effective date and installment plan. Verify invoice dates and amounts against business rules, including fees and rounding.',
'Test changes such as endorsements or cancellation using agreed requirements for credits and future installments. Do not assume one insurer’s billing schedule applies to every implementation.'
],'How would you validate an installment plan?','I would establish the premium, fees, billing plan and effective date, calculate the expected schedule independently, and compare invoice dates and amounts. I would include rounding, partial-period changes, a credit and a cancellation scenario.','Build expected invoice values for a fictional premium of 1,200 split into four equal installments with no fees.'),
L('Payment allocation & reconciliation','A received payment, its allocation and its external settlement are separate checkpoints.',[
'Test full payment, partial payment, overpayment and unallocated funds according to the allocation rules configured for the account.',
'Check that reversals or refunds update the appropriate balances and retain an audit trail. Cover insufficient permissions and duplicate external payment references.',
'Reconcile source payment references, posted transactions and receiver acknowledgments. For test data, never use real payment credentials or customer details.'
],'What would you test for a duplicate payment notification?','I would send the same external reference twice and verify the configured idempotency behavior. I would check that financial impact is not duplicated, the response is meaningful and the duplicate is traceable in logs or audit records.','Create a table showing expected outstanding amounts after full, partial and reversed payments.'),
L('Delinquency, batches & integration checks','Time-driven billing workflows need controlled dates and repeatable data.',[
'Use a known invoice due date and a controlled business clock where supported. Verify grace periods, notices and escalation steps from the actual billing rules.',
'Test batch reruns and partial failures. A restarted job must follow the system’s documented restart and duplicate-prevention behavior.',
'For cancellation-related messages, verify both the billing event and the receiving policy workflow. An overdue invoice does not by itself prove a policy was cancelled.'
],'How do you test a nightly billing batch?','I would seed records for each eligibility boundary, record expected counts and amounts, execute the job in an approved environment, and reconcile processed, skipped and failed records. I would also test restart behavior and inspect downstream effects.','Design a batch reconciliation sheet with input, processed, rejected and retried counts.') ]},
{id:'policycenter',name:'PolicyCenter',group:'Guidewire',icon:'PC',color:'#598e91',tint:'#e5f2ef',desc:'Explore submissions, quotes, underwriting and policy transactions.',source:'guidewire',lessons:[
L('Submission, quote, bind & issue','Build a clear story of how a proposed risk becomes an insurance policy.',[
'Prepare applicant, product, risk and coverage data. A submission is the workflow for new business; a quote calculates proposed terms and pricing.',
'Binding commits coverage subject to the applicable business process; issuance produces the policy. Confirm the states and permissions required by your implementation.',
'Test mandatory risk data, underwriting referrals, quote changes and prohibited actions. Compare premium calculations with an approved rating reference, not with your own guess.'
],'How would you test new business end to end?','I would create a submission with controlled risk data, select coverage, request a quote, resolve permitted underwriting issues, then bind and issue. I would verify dates, forms, premium and the outgoing billing instruction. I would also cover blocked and referred risks.','Draw a state transition table for draft, quoted, bound and issued, including invalid transitions.'),
L('Policy change, renewal & cancellation','Transactions modify coverage over time. Dates are as important as field values.',[
'For an endorsement or policy change, compare before-and-after coverage, effective dates, premium changes and outgoing billing effects.',
'For renewal, test term rollover, updated risk information and configured underwriting requirements. For cancellation and reinstatement, test allowed reasons and dates.',
'Include overlapping changes, effective-date boundaries and out-of-sequence transactions only when supported by the project. Verify the business-approved expected policy timeline.'
],'Why are effective dates important in PolicyCenter testing?','A value can be correct for one period and incorrect for another. I check the transaction effective date, policy term boundaries and which coverage applies on a chosen date. I also verify financial adjustments and downstream consumers use the intended version.','Design three tests for a midterm coverage increase, including a date boundary and a billing adjustment.'),
L('Underwriting, rating & cross-center testing','A strong QA answer connects business rules to evidence across system boundaries.',[
'Build a decision table for an underwriting rule with conditions, expected referral or block, authority and approval outcome.',
'Validate rating inputs and calculated outputs against approved examples. Include missing inputs, minimum/maximum values and currency rounding.',
'Test policy information consumed by claim and billing processes through the actual integration design. Systems may communicate through middleware; do not assume a direct connection.'
],'How do you test a premium mismatch?','I compare the exact risk inputs, coverage options, effective dates, rate-table versions and rounding rules with the approved expected result. Then I identify whether the mismatch begins in input mapping, rating, display or downstream billing.','Create a traceability chain from one underwriting requirement to a UI test, API test and expected evidence.') ]},
{id:'selenium',name:'Java with Selenium',group:'Automation',icon:'Se',color:'#6b9977',tint:'#eaf4e9',desc:'Build maintainable browser tests with reliable locators and page objects.',source:'selenium',lessons:[
L('Locators, waits & a reliable first test','Synchronize with observable application state instead of adding arbitrary delays.',[
'Choose stable IDs or agreed data attributes when available. Avoid absolute XPath and selectors coupled to changing row positions.',
'Use explicit waits for the condition required by the next action. Selenium warns against mixing implicit and explicit waits because timeout behavior can become unpredictable.',
'After an action, assert its business outcome. A successful click does not prove a claim was created.'
],'Why prefer an explicit wait to Thread.sleep?','An explicit wait polls for a meaningful condition up to a limit, so it can finish as soon as the application is ready. A fixed sleep always waits its full duration and still fails if the application takes longer. I choose the condition to match the action.','Replace three fixed sleeps in a sample test with waits for visible, enabled or resulting-state conditions.',
'// Java snippet: driver is an initialized WebDriver.\nWebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nBy save = By.cssSelector("[data-testid=save-claim]");\nwait.until(ExpectedConditions.elementToBeClickable(save)).click();\nString claimId = wait.until(ExpectedConditions\n    .visibilityOfElementLocated(By.cssSelector("[data-testid=claim-id]")))\n    .getText();\nAssert.assertFalse(claimId.isBlank());','Java · Selenium / TestNG imports required'),
L('Page objects & framework design','Separate the vocabulary of the business test from the details of browser interaction.',[
'A page object exposes operations such as searchClaim or submitLoss. Keep locators and synchronization close to those operations.',
'Keep test expectations in the test layer, while a page object may verify that its expected page is loaded. Share configuration and fixtures without creating one global mutable driver.',
'Provide isolated test data, deterministic cleanup, failure screenshots and useful reporting. Parallel tests need independent browser sessions and data.'
],'What belongs in your automation framework?','I use a test layer for scenarios and assertions, page or component objects for UI interactions, fixture builders for data, configuration for environments and reporting for evidence. I avoid deep inheritance and shared mutable test state.','Sketch packages for pages, tests, fixtures and configuration. Show where driver cleanup happens.'),
L('Debugging stale elements & flaky tests','Diagnose the failure mechanism before adding retries.',[
'A stale element reference can occur when a previously located DOM node is replaced or detached. Re-locate after the relevant page update.',
'Capture screenshots, URL, logs and the failed condition. Investigate shared data, timing, overlays, unstable selectors and external dependency failures.',
'A limited retry may aid diagnosis of intermittent failures, but a passing retry should remain visible. Avoid hiding a persistent product defect with blanket retries.'
],'How would you fix a flaky test?','I reproduce it with evidence, classify the failure and eliminate the root cause. For a re-rendered table I wait for the expected table state and locate the row again. I also isolate data and verify the failure rate after the change.','Write a short defect report for a test that passes alone but fails in parallel.') ]},
{id:'playwright',name:'Playwright with TypeScript',group:'Automation',icon:'Pw',color:'#b17b64',tint:'#fbede5',desc:'Learn locators, fixtures, assertions and modern browser automation.',source:'playwright',lessons:[
L('Locators & web-first assertions','Use locators that reflect how a user interacts with your application.',[
'Prefer role, label and other user-facing locators, or a deliberate test-ID contract. Scope repeated elements to the relevant form or row.',
'Playwright actions perform actionability checks. Use retrying locator assertions for expected UI state; do not assume every custom asynchronous process is automatically awaited.',
'Await asynchronous operations and keep tests isolated. Use a fresh browser context or the runner’s default isolated fixtures.'
],'Does Playwright eliminate all waiting problems?','No. It waits for relevant actionability checks and its web assertions can retry, but I still need to model the correct business state. For background processing I wait for a meaningful UI or API result with a bounded timeout.','Write a test that submits a fictional claim and verifies the confirmation heading.',
"import { test, expect } from '@playwright/test';\n\ntest('search a claim', async ({ page }) => {\n  // Configure baseURL and provide authenticated state for your test app.\n  await page.goto('/claims');\n  await page.getByLabel('Claim number').fill('DEMO-101');\n  await page.getByRole('button', { name: 'Search', exact: true }).click();\n  await expect(page.getByRole('cell', { name: 'DEMO-101', exact: true }))\n    .toBeVisible();\n});",'TypeScript · illustrative test app'),
L('TypeScript, fixtures & reusable test data','Types make assumptions visible; fixtures make setup explicit.',[
'Define types for data exchanged between helpers. Prefer a specific ClaimInput type over any, and validate untrusted runtime responses separately.',
'Use fixtures to set up and release resources. Keep worker-scoped resources safe for parallel execution; avoid a shared account when tests mutate its state.',
'Store environment URLs in configuration and credentials in a secret manager or protected CI variables. Do not commit authentication state files.'
],'Why use fixtures instead of one long beforeEach?','Fixtures make dependencies explicit, support reuse and place teardown near setup. I can compose an authenticated page and seeded claim without every test knowing how to create them. I choose scope based on isolation and cost.','Define a ClaimInput type with policyNumber, lossDate and description, then write a typed data builder.'),
L('Traces, API setup & parallel execution','Use evidence to shorten failure investigation.',[
'A trace can show actions, snapshots and network activity. Retain suitable failure artifacts with access controls because test data may appear in them.',
'Use API setup to create prerequisites when it is supported, then reserve browser steps for the behavior being tested.',
'Tune workers to environment capacity. Give tests unique data and clean up their own records. Record flaky outcomes even if a retry passes.'
],'A Playwright test fails only in CI. What do you inspect?','I inspect its trace, screenshot, console and network evidence, then compare environment variables, browser versions, resources, test ordering and data isolation. I reproduce with comparable settings before changing timeouts.','Write an investigation checklist for a CI-only timeout on a claim search.') ]},
{id:'testng',name:'TestNG',group:'Automation',icon:'Tn',color:'#668bb3',tint:'#eaf1fa',desc:'Organize Java tests with annotations, data providers and suites.',source:'testng',lessons:[
L('Annotations & test lifecycle','Choose setup scope deliberately so tests stay independent.',[
'@BeforeMethod and @AfterMethod run around test methods. @BeforeClass runs before the first test method in that class; @BeforeSuite applies to the suite.',
'@BeforeTest refers to the XML <test> grouping, not each individual Java test method. This is a common interview distinction.',
'Use reliable teardown, such as @AfterMethod(alwaysRun = true), with null-safe resource cleanup. Keep setup failures visible in reports.'
],'What is the difference between BeforeTest and BeforeMethod?','BeforeTest is scoped to the test grouping in the TestNG XML suite. BeforeMethod is scoped to each test method. For an independent browser per method, I usually initialize at method scope and tear it down reliably.','Map browser startup, shared configuration and test-data setup to appropriate lifecycle scopes.'),
L('Data providers, groups & assertions','Separate example inputs from the behavior under test.',[
'A @DataProvider supplies argument sets. Each row should describe a distinct, traceable case.',
'Groups can select smoke or regression coverage. A hard assertion fails immediately; soft assertions collect failures until assertAll is invoked.',
'Use meaningful expected values. A data-driven test that only checks for no exception has weak coverage.'
],'When would you use a DataProvider?','When the same behavior needs multiple inputs and expected outcomes, such as validation boundaries. I keep rows small and identifiable, and avoid mixing unrelated business flows into one test.','Add empty, valid and invalid-format policy-number cases to a data provider.',
'@DataProvider(name = "positiveAmounts")\npublic Object[][] amounts() {\n  return new Object[][] {{1}, {100}, {1000}};\n}\n\n@Test(dataProvider = "positiveAmounts", groups = "smoke")\npublic void amountIsPositive(int amount) {\n  Assert.assertTrue(amount > 0, "Amount must be positive");\n}','Java · inside a test class with TestNG imports'),
L('Parallel suites & useful reporting','Speed up execution only when the tests can safely run independently.',[
'Choose parallel scope and thread counts based on the environment. Isolate drivers and data; a static shared WebDriver is unsafe for independent parallel tests.',
'Listeners can collect screenshots and metadata on failure. Reports should identify environment, test inputs and actionable failure evidence.',
'Avoid ordering independent tests with priority or dependencies. If a business journey needs multiple actions, express that journey within an independent scenario.'
],'How do you run Selenium tests in parallel with TestNG?','I configure an appropriate parallel scope, give each test its own driver lifecycle and unique data, and make reporting thread-safe. I start with a low thread count and increase it only after confirming the environment can handle the load.','Explain why two tests updating the same policy may fail even when each has a separate driver.') ]},
{id:'api',name:'API Testing',group:'Testing',icon:'{ }',color:'#9b7cbc',tint:'#f2eafa',desc:'Validate contracts, authentication, negative paths and integrations.',source:'api',lessons:[
L('HTTP, contracts & meaningful assertions','Validate what an API promises, including its business effects.',[
'Inspect method, path, headers, authentication and payload. Compare status, response fields and error structure with the agreed contract.',
'Test missing and invalid inputs, unauthorized users, boundary values, pagination and filtering. Authentication and authorization need separate coverage.',
'Verify persistent state or downstream effects when relevant. An expected status code alone is insufficient.'
],'What do you validate in an API response?','I validate the status, relevant headers, schema, required fields and business values. I then verify state changes or downstream effects and check negative cases. For asynchronous operations, I validate the completion contract separately from initial acceptance.','Design six tests for a fictional POST /claims endpoint, including missing authorization and invalid loss date.',
"// Postman post-response example; adapt to the endpoint contract.\npm.test('claim created', () => {\n  pm.response.to.have.status(201);\n  const body = pm.response.json();\n  pm.expect(body.id).to.be.a('string').and.not.empty;\n});",'JavaScript · Postman'),
L('Authentication, idempotency & retries','Repeat requests safely and verify access at the resource level.',[
'Authentication establishes identity; authorization controls permitted actions and resources. Test a valid user accessing another user’s restricted record.',
'Idempotency concerns repeated effects. For a create operation, verify the API’s documented idempotency mechanism rather than assuming repeated POSTs are safe.',
'Use bounded retries for appropriate transient errors. Record request identifiers and avoid exposing tokens in screenshots or reports.'
],'How do you test idempotency?','I repeat the same logical operation using the documented idempotency key and compare responses and persistent records. I also test a changed payload with the same key and concurrent requests according to the contract.','Write expected outcomes for the same request twice, a different key and a reused key with a changed body.'),
L('API automation & integration diagnosis','Make request chains reproducible and failures easy to locate.',[
'Generate isolated data, create a record, extract its identifier, read it back and verify its business fields. Clean up only data owned by the test.',
'Separate contract tests, component tests and end-to-end integration checks. A mocked dependency cannot prove the real integration works.',
'For eventually consistent data, poll a specific state with a deadline and capture the last response on timeout.'
],'How do you debug an intermittent integration failure?','I trace a single operation using request and correlation IDs across systems. I compare payload mapping, response status, queue or retry state and timing. Then I reproduce the failing boundary with a controlled request.','Create an API checklist for a policy-issued event that triggers billing setup.') ]},
{id:'manual',name:'Manual Testing',group:'Testing',icon:'✓',color:'#b39452',tint:'#f8f1df',desc:'Strengthen test design, exploratory testing and defect communication.',lessons:[
L('Test design & risk-based coverage','A useful test strategy begins with risks and expected behavior.',[
'Use equivalence partitions to group inputs with similar expected behavior. Test boundaries such as a permitted amount’s minimum and maximum, plus adjacent invalid values.',
'Use decision tables for combinations of business rules and state-transition tests for lifecycle behavior.',
'Prioritize impact and likelihood. Include accessibility, permissions, data integrity and recoverability where they matter to the feature.'
],'How do you test when requirements are incomplete?','I identify the business objective, write down assumptions and ask focused questions about ambiguous rules. Meanwhile I explore existing behavior and design risk-based cases. I keep unconfirmed expectations visible and obtain agreement before treating them as defects.','For an amount range of 1–10,000 inclusive, list boundary cases and explain your selected partitions.'),
L('Defects, severity & priority','Give the team enough evidence to reproduce and assess the problem.',[
'Record a precise title, environment, build, preconditions, reproducible steps, expected result, actual result and relevant evidence.',
'Severity describes impact; priority describes urgency. The team agrees the final classifications based on business context.',
'Retest the fix and choose nearby regression checks. Closing a defect is not the same as proving that every related path is safe.'
],'Can a defect have high priority and low severity?','Yes. A visible spelling mistake on a launch-critical page may be low in functional impact but urgent to fix. I explain the context and follow the team’s triage process rather than assigning urgency from technical impact alone.','Write a defect for an invoice balance that does not refresh after a partial payment.'),
L('Exploratory testing & release confidence','Combine structured coverage with purposeful investigation.',[
'Create a time-boxed charter, such as exploring recovery after a failed claim submission. Record data, observations and unanswered questions.',
'Distinguish smoke testing of critical availability from broader regression of existing behavior. Define these terms with your team.',
'Report coverage, defects, blocked tests and residual risk. A pass percentage without scope and risk context is not a release recommendation.'
],'When would you stop testing?','I assess the agreed exit criteria, coverage of critical risks, unresolved defects and available evidence. I communicate residual risk and blocked areas so the accountable stakeholders can make a release decision. Testing cannot prove the absence of all defects.','Prepare a five-line test summary with one open defect and one environment limitation.') ]},
{id:'database',name:'Database & ETL Testing',group:'Testing',icon:'DB',color:'#698ea0',tint:'#e7f1f6',desc:'Practice SQL, reconciliation, transformations and data quality checks.',source:'sql',lessons:[
L('SQL essentials for QA','Use queries to validate relationships and business outcomes, not just row counts.',[
'SELECT, WHERE, JOIN and GROUP BY help inspect data. Understand inner versus left joins and how one-to-many joins can multiply rows.',
'Check nulls with IS NULL. Include uniqueness, reference integrity and expected values alongside aggregate counts.',
'Use read-only access when investigating shared environments. The example tables below are fictional; production schemas must be confirmed.'
],'Why can a join create unexpected duplicate rows?','A join returns matching row combinations. If a policy has multiple claims, its policy fields appear once for each matching claim. I verify relationship cardinality and the intended grain before using DISTINCT, which can hide a modeling mistake.','Explain what happens to policies without claims in the following query.',
'-- Fictional training schema, not Guidewire tables.\nSELECT p.policy_number, COUNT(c.claim_id) AS claim_count\nFROM policies p\nLEFT JOIN claims c ON c.policy_id = p.policy_id\nGROUP BY p.policy_number;','SQL'),
L('ETL mappings & reconciliation','Validate extract, transform and load at the intended data grain.',[
'Read source-to-target mappings for types, lookups, defaults, calculations and reject handling. Identify business keys and the expected target grain.',
'Reconcile counts and financial totals after accounting for filters, deduplication and rejected records. Equal counts alone do not prove correct data.',
'Test nulls, invalid dates, truncation, rounding, duplicate source keys and late-arriving records. Verify the reject record includes a useful reason.'
],'How would you test an ETL pipeline?','I verify extraction completeness, each transformation rule and target constraints. I reconcile business keys and aggregates, sample critical records and validate rejects. Finally I test incremental loads and restart behavior to detect lost or duplicated data.','Create a mapping test for converting a source premium into a target decimal with two fractional digits.'),
L('Incremental loads, duplicates & history','An incremental pipeline must handle more than new records.',[
'Test inserted, updated and deleted records according to the extraction design. Include records at the watermark boundary and late-arriving changes.',
'Verify rerun behavior for the same batch. For historical dimensions, test effective intervals and current-record flags against the chosen history model.',
'Compare source and target business keys and important fields. Control time zones and define what a business day means for the load.'
],'The row counts match. Can the ETL test pass?','Not on that evidence alone. Rows may contain wrong values or the wrong keys. I also compare transformed fields, totals, key completeness, duplicates, relationships and rejected data.','Write a query to find duplicate claim business keys, then explain how you would investigate them.',
'-- Fictional warehouse table.\nSELECT claim_number, COUNT(*) AS occurrences\nFROM claim_snapshot\nGROUP BY claim_number\nHAVING COUNT(*) > 1;','SQL') ]},
{id:'java',name:'Java Coding for Testers',group:'Automation',icon:'Ja',color:'#bb8660',tint:'#fbefe4',desc:'Master essential Java concepts and common coding interview exercises.',source:'java',lessons:[
L('OOP, strings & collections','Connect language concepts to practical automation design.',[
'Encapsulation keeps implementation behind a clear interface; a page object is one practical example. Prefer composition when inheritance would create tight coupling.',
'Use equals for logical string equality; == compares references for objects. Know when a value may be null before invoking methods.',
'Use List for ordered elements, Set for uniqueness and Map for key-value lookup. Choose collection behavior deliberately.'
],'How do you apply OOP in an automation framework?','I encapsulate UI interaction in page components, use interfaces for interchangeable services and compose test helpers. I use inheritance sparingly, where there is a clear relationship and shared behavior. This keeps changes localized.','Explain why two strings with the same characters can make == return false.'),
L('Palindrome & character-count exercises','Explain assumptions and edge cases before writing code.',[
'Clarify whether case, spaces and punctuation count. The example normalizes ASCII letters and digits and rejects null.',
'Use two pointers to compare opposite characters. The comparison is linear in normalized length; normalization allocates a new string.',
'Test empty text, one character, mixed case, punctuation-only input and a clear non-palindrome. For full Unicode support, agree character and normalization rules.'
],'How would you approach an unfamiliar coding question?','I restate the input and expected output, clarify edge cases, walk through a small example and choose a simple approach. Then I write readable code, explain complexity and test both normal and boundary cases.','Modify this example so punctuation-only input returns false. Explain your change.',
'import java.util.Locale;\n\npublic class Practice {\n  static boolean isPalindrome(String input) {\n    if (input == null) return false;\n    String s = input.toLowerCase(Locale.ROOT)\n        .replaceAll("[^a-z0-9]", "");\n    for (int left = 0, right = s.length() - 1; left < right; left++, right--) {\n      if (s.charAt(left) != s.charAt(right)) return false;\n    }\n    return true;\n  }\n  public static void main(String[] args) {\n    System.out.println(isPalindrome("Madam")); // true\n    System.out.println(isPalindrome("Claim")); // false\n  }\n}','Java · runnable Practice.java'),
L('Duplicates, exceptions & practical debugging','Small coding tasks often test clarity more than cleverness.',[
'A set can track previously seen values. A second set can collect duplicates once while preserving their first duplicate encounter order.',
'Catch exceptions only where you can add context, recover or clean up. Do not silently swallow exceptions in test helpers.',
'Use try-with-resources for suitable closeable resources and a guaranteed teardown for browsers. Preserve the original failure when reporting cleanup errors.'
],'How do you find duplicates in an array?','I track seen values in a set. If adding a value returns false, I place it in a duplicates set. This is expected linear time with hash-based sets and uses additional memory proportional to the distinct values.','Predict the output for {4, 2, 4, 7, 2, 4}, then test an empty array.',
'import java.util.*;\n\npublic class Duplicates {\n  public static void main(String[] args) {\n    int[] values = {4, 2, 4, 7, 2, 4};\n    Set<Integer> seen = new HashSet<>();\n    Set<Integer> duplicates = new LinkedHashSet<>();\n    for (int value : values) {\n      if (!seen.add(value)) duplicates.add(value);\n    }\n    System.out.println(duplicates); // [4, 2]\n  }\n}','Java · runnable Duplicates.java') ]},
{id:'git',name:'Git & GitLab',group:'Delivery',icon:'⑂',color:'#b6776c',tint:'#f9ebe7',desc:'Work confidently with branches, commits, merge requests and reviews.',source:'git',lessons:[
L('The everyday Git workflow','Understand the working tree, staging area and repository history.',[
'Use git status and git diff to inspect changes. Stage only intended files, then create a focused commit with a meaningful message.',
'A branch points to a line of development. Fetch updates your knowledge of remote history; pulling also integrates remote changes according to configuration.',
'Git is the version-control system. GitLab hosts repositories and provides collaboration features such as merge requests and CI/CD.'
],'What is the difference between Git and GitLab?','Git records version history and supports branching and merging. GitLab is a collaboration platform that hosts Git repositories and adds review, issue management and pipeline features. I use Git locally and GitLab to collaborate with the team.','Create a practice branch and review a diff before staging a test file.',
'git status\ngit switch -c qa/claim-search\n# Edit a test file, then inspect it.\ngit diff\ngit add tests/ClaimSearchTest.java\ngit commit -m "Cover claim search by number"\ngit push -u origin qa/claim-search','Shell · example repository'),
L('Merge requests & constructive reviews','Make test changes easy for another person to assess.',[
'Describe the problem, resulting behavior and verification. Include relevant failure evidence without exposing sensitive data.',
'Review assertions, locator stability, fixture isolation and cleanup. A test that always passes is more dangerous than an obviously failing test.',
'Keep changes focused. Address review feedback with an explanation and rerun affected checks before merging under the team’s process.'
],'What do you check when reviewing an automated test?','I check that it can fail for the intended defect, uses trustworthy expected values, isolates data and cleans up resources. I also examine readability, selectors, waits and the usefulness of failure evidence.','Write a merge request description for replacing a fixed sleep with a state-based wait.'),
L('Conflicts, revert & safe collaboration','Resolve conflicts by preserving the intended behavior of both changes.',[
'Inspect the conflicting sections and understand each side. Edit the final desired content, remove conflict markers and run the affected checks before completing the operation.',
'A revert creates a new commit that reverses an earlier change. Reset moves a branch reference and can also affect staged or working files depending on mode.',
'Avoid rewriting shared history without team agreement. Back up work and inspect status before commands that discard changes.'
],'How do you resolve a merge conflict?','I understand both changes, decide the correct combined behavior and edit the conflicted file. I stage the resolved content, complete the merge and run the affected tests. I consult the other author when business intent is unclear.','Explain why choosing “accept current” for every conflict can break an automation suite.') ]},
{id:'cicd',name:'CI/CD Concepts',group:'Delivery',icon:'∞',color:'#6e86b6',tint:'#ebeffa',desc:'Understand pipelines, runners, quality gates and test reporting.',source:'cicd',lessons:[
L('CI, continuous delivery & deployment','Know what is automated and where a release decision happens.',[
'Continuous integration frequently validates integrated changes through automated checks. Continuous delivery keeps changes ready for release, potentially with a manual production decision.',
'Continuous deployment automatically releases qualifying changes to production. Teams may use different controls, so ask about their actual process.',
'Use fast checks early and broader regression at appropriate stages. Define failure ownership and meaningful quality gates.'
],'Where should QA automation run in a pipeline?','I run fast deterministic checks on each relevant change, a focused integration or UI smoke suite against a suitable environment, and broader regression when needed. I balance feedback time, risk and infrastructure capacity.','Design a pipeline with build, API checks, UI smoke tests and an approval before production.'),
L('GitLab pipelines, jobs & artifacts','A useful pipeline reports enough evidence for someone who did not run the test.',[
'Define jobs and stages in .gitlab-ci.yml. Runners execute jobs; runner capabilities and images determine what tools are available.',
'Keep reports and screenshots as artifacts with suitable retention. Test-report ingestion and downloadable files are related but distinct.',
'The example runs Maven tests and publishes Surefire XML. Browser-based tests additionally need a suitable browser environment and project configuration.'
],'What is the difference between a cache and an artifact?','A cache typically speeds later jobs by reusing data such as downloaded dependencies. An artifact is output retained or passed along from a job, such as test results. Correctness should not depend on a stale or missing cache.','Extend the example with a separate smoke job, explaining the browser and test-selection requirements.',
'image: maven:3.9-eclipse-temurin-17\nstages: [test]\nunit_tests:\n  stage: test\n  script:\n    - mvn -B test\n  artifacts:\n    when: always\n    expire_in: 7 days\n    reports:\n      junit: target/surefire-reports/TEST-*.xml\n    paths:\n      - target/surefire-reports/','YAML · illustrative Maven project'),
L('Secrets, flaky builds & release gates','A green pipeline is useful only when its checks are trustworthy.',[
'Keep credentials in appropriately protected CI variables or a secret manager. Avoid printing them and restrict which jobs can access them.',
'Distinguish infrastructure failures from assertion failures. Preserve failure artifacts and track flaky tests with an owner and remediation plan.',
'Set explicit gates around critical tests, known issues and approvals. Quarantined tests should remain visible with the risk documented.'
],'Your pipeline is red before release. What do you do?','I inspect the failing job and evidence, identify whether it is a product, test or infrastructure issue, and reproduce where possible. I communicate the release risk and follow the agreed gate policy. I do not simply rerun until a green result hides the failure.','Write a release update for a failed payment regression test and an unrelated runner outage.') ]},
{id:'hr',name:'HR Questions & Answers',group:'Career',icon:'Hi',color:'#9d7a9c',tint:'#f3eaf2',desc:'Shape clear, honest answers about your experience and ways of working.',lessons:[
L('Tell me about yourself','Build a concise introduction around experience, evidence and direction. Replace every placeholder with your own facts.',[
'Start with your current QA focus and actual experience. Mention the business workflows and tools you have personally used.',
'Choose one concrete contribution and describe its result. Use a measured outcome only if you can support it.',
'Connect your next step to the role. Aim for a natural 60–90 second introduction rather than memorizing a long script.'
],'Tell me about yourself.','I am a QA professional with [actual experience] focused on [your domain]. In my recent work I tested [workflow] using [tools you used]. One contribution I am proud of is [specific action and evidence]. I am now looking for a role where I can deepen my Guidewire and automation skills while contributing to reliable releases.','Record a 60-second introduction. Remove any claim you could not explain with a real example.'),
L('Behavioral answers with STAR','Use situation, task, action and result to make your contribution clear.',[
'Keep the situation and task brief. Spend most of the answer explaining what you did and why.',
'Choose examples about finding a critical defect, resolving disagreement, learning a tool or improving a difficult test process.',
'Be honest about the result and what you learned. Separate your contribution from the team’s collective work.'
],'Tell me about a disagreement with a developer.','In [real situation], we disagreed about [expected behavior]. I collected reproducible steps and the relevant requirement, discussed the evidence with the developer and involved the business analyst for the ambiguity. We agreed on [actual resolution]. I learned to make assumptions explicit earlier.','Prepare one STAR answer about a missed defect and explain the process improvement that followed.'),
L('Career changes, gaps & interviewer questions','Stay factual, forward-looking and connected to the work.',[
'For a change of role, explain what you want to learn or contribute. Avoid criticizing former colleagues or inventing a reason.',
'For a career gap, provide a concise explanation you are comfortable sharing, followed by your readiness and relevant preparation.',
'Ask about release cadence, Guidewire products, automation coverage, test environments and success expectations for the first three months.'
],'Why should we hire you?','My relevant strengths are [domain understanding], [automation capability] and [collaboration example]. In [real project], I demonstrated these by [specific evidence]. I would bring that approach to your team and actively learn the parts of your Guidewire implementation that are new to me.','Choose three questions to ask the interviewer that will help you understand the actual QA role.') ]},
{id:'salary',name:'Salary Negotiation',group:'Career',icon:'↗',color:'#738f76',tint:'#eaf2e8',desc:'Prepare calm, evidence-based conversations about your next offer.',lessons:[
L('Prepare your range & priorities','Create a personal negotiation plan using current evidence relevant to your location and role.',[
'Research comparable roles, experience levels and locations using current sources. This guide intentionally does not supply a universal salary range.',
'List your target, acceptable alternatives and private walk-away point. Consider role scope, learning, working arrangements and compensation structure.',
'Compare fixed pay, variable pay, joining incentives, benefits and conditions separately. Ask for written details so the offers are comparable.'
],'What are your salary expectations?','Based on the role scope, my relevant experience and current market research, I am targeting [your researched range]. I am open to discussing the overall package and responsibilities. Could you share the budgeted range and the fixed-versus-variable structure?','Create a private offer comparison with fixed pay, variable pay, benefits, conditions and non-salary priorities.'),
L('Responding to an offer & counteroffers','Express interest, explain your request and leave space for a discussion.',[
'Thank the employer and ask for the written package, decision timeline and any unclear conditions.',
'Make a specific, supportable request based on responsibilities and your relevant evidence. Do not invent competing offers or inflate current compensation.',
'If fixed pay cannot change, discuss options you actually value, such as a joining incentive, work arrangement or documented review timeline. Treat a future review as a possibility, not a guaranteed raise.'
],'The offer is below your target. What would you say?','Thank you for the offer. I am interested in the role and the team. Given [relevant experience and role scope], I was hoping for [supported target]. Is there flexibility in the fixed component? If that is constrained, I would be glad to discuss the other parts of the package.','Write a counteroffer in under 100 words with one evidence-based request and a respectful tone.'),
L('Difficult salary questions & closing clearly','Keep the conversation accurate and avoid making commitments before understanding the terms.',[
'If asked about other offers, answer truthfully and share only details you are comfortable disclosing.',
'If you prefer not to discuss salary history, redirect politely to role expectations and your researched target. Requirements and practices vary by location.',
'Before accepting, confirm title, reporting line, compensation components, location, start date and material conditions in writing. Ask the appropriate professional for interpretation of unfamiliar contractual terms.'
],'Is this your final expectation?','This is the range I believe fits the role and my relevant experience. I would like to understand the complete written package before making a final decision. My priorities are [your priorities], and I am open to a constructive discussion within those.','Practice a 30-second response to pressure for an immediate decision, including a specific reasonable follow-up time.') ]}
];
TOPICS.forEach(t=>t.lessons.forEach((l,i)=>{l.id=`${t.id}-${i+1}`;l.topic=t.id;l.minutes=Math.max(3,Math.ceil((l.intro+' '+l.points.join(' ')+' '+l.a+' '+l.practice+' '+l.code).split(/\s+/).length/160)+2);}));
