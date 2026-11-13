// Additional original concept lessons and interview practice. Existing lesson IDs remain unchanged.
const ADDITIONAL_CONCEPTS = {
  "selenium": [
    {
      "title": "Maven dependencies & reproducible setup",
      "intro": "A reproducible test project declares its libraries rather than depending on files installed manually on one laptop.",
      "points": [
        "Declare Selenium and the test framework in the build configuration. Pin versions deliberately and use the project’s supported Java runtime.",
        "Check dependency conflicts when a runtime method is missing. A successful compilation does not guarantee that CI loads the same transitive library versions.",
        "Keep a small browser-startup smoke check and record Java, Selenium and browser versions in failure evidence."
      ],
      "q": "How do you investigate a Selenium test that works only on your machine?",
      "a": "I compare the resolved dependencies, Java runtime, browser environment and configuration. I reproduce from a clean checkout using the documented build command before changing the test. I also check whether local files or cached credentials are hiding missing setup.",
      "practice": "Explain what belongs in pom.xml and what belongs in environment configuration.",
      "source": [
        "Selenium · Maven dependencies & reproducible setup",
        "https://www.selenium.dev/documentation/webdriver/getting_started/install_library/"
      ]
    },
    {
      "title": "Browser options & session configuration",
      "intro": "Browser configuration is part of the test’s inputs and should be visible and controlled.",
      "points": [
        "Use the browser-specific options object to request relevant settings. Avoid adding unexplained flags copied from unrelated troubleshooting posts.",
        "Keep viewport, language and headless settings consistent with the scenario. Record capabilities returned by the session when diagnosing differences.",
        "A permissive setting can conceal a defect. For example, accepting invalid certificates should be a deliberate test-environment decision, not an unconditional default."
      ],
      "q": "What would you configure before starting a browser session?",
      "a": "I define the intended browser, environment-specific settings and a consistent window size. I keep optional flags minimal and documented. After startup I retain the actual session capabilities so I can compare local and CI behavior accurately.",
      "practice": "Create a configuration checklist for an English-language desktop smoke test.",
      "source": [
        "Selenium · Browser options & session configuration",
        "https://www.selenium.dev/documentation/webdriver/drivers/options/"
      ]
    },
    {
      "title": "Driver services & diagnostic logs",
      "intro": "The driver service is a process boundary between Java test code and a locally controlled browser.",
      "points": [
        "A service object can control supported driver-process settings such as executable selection, port and log destination.",
        "Keep each test run’s log path distinct. Concurrent processes writing one file can overwrite the evidence needed for diagnosis.",
        "Investigate startup failures separately from assertion failures: permissions, unavailable executables or port conflicts can prevent a browser session from being created."
      ],
      "q": "Why collect driver-service logs?",
      "a": "They help identify failures before a page interaction occurs, such as browser startup or session negotiation problems. I correlate the driver log with test timestamps and capabilities, while avoiding sensitive input in published artifacts. I do not interpret a startup failure as a business-feature defect.",
      "practice": "Classify three failures as driver startup, navigation or assertion failures.",
      "source": [
        "Selenium · Driver services & diagnostic logs",
        "https://www.selenium.dev/documentation/webdriver/drivers/service/"
      ]
    },
    {
      "title": "RemoteWebDriver & remote file paths",
      "intro": "Remote execution moves browser work to another machine while the test code may remain elsewhere.",
      "points": [
        "Connect RemoteWebDriver to the approved remote endpoint and request supported capabilities. The remote browser’s filesystem is not necessarily the test runner’s filesystem.",
        "For uploads, use the supported remote file-transfer behavior instead of assuming a local path exists on the node.",
        "Collect session identifiers and node-side evidence. Network failures between runner and node differ from application failures inside the browser."
      ],
      "q": "What changes when a Selenium test runs remotely?",
      "a": "I consider browser availability, capabilities, file transfer and evidence collection on the remote machine. I retain the session ID and inspect network or node failures separately. The test’s business assertions should remain meaningful regardless of the browser’s physical location.",
      "practice": "List which machine owns an upload input file and a downloaded file in a remote run.",
      "source": [
        "Selenium · RemoteWebDriver & remote file paths",
        "https://www.selenium.dev/documentation/webdriver/drivers/remote_webdriver/"
      ]
    },
    {
      "title": "Chrome sessions & headless parity",
      "intro": "Headless execution changes how the browser is presented, but the tested behavior still needs realistic environmental assumptions.",
      "points": [
        "Use ChromeOptions for Chrome-specific settings and verify support in the version used by the project.",
        "Specify a suitable viewport and compare fonts, download settings and permissions when headed and headless results differ.",
        "Do not solve every headless failure by increasing timeouts. Capture a screenshot and inspect whether the application rendered a different layout or error page."
      ],
      "q": "A test passes headed but fails headless. What do you inspect?",
      "a": "I compare viewport, browser version, capabilities and rendered content. I inspect the failed action’s screenshot and logs to distinguish a hidden control from a server error. Then I reproduce with the same settings and correct the specific difference.",
      "practice": "Describe a responsive-layout failure that could appear only in headless execution.",
      "source": [
        "Selenium · Chrome sessions & headless parity",
        "https://www.selenium.dev/documentation/webdriver/browsers/chrome/"
      ]
    },
    {
      "title": "Firefox profiles & browser-specific behavior",
      "intro": "Cross-browser coverage is valuable when it checks genuine compatibility instead of merely repeating one browser’s assumptions.",
      "points": [
        "Use FirefoxOptions for Firefox configuration and avoid sharing a mutable real-user profile between independent tests.",
        "Test differences in form controls, rendering and supported browser features using the same business outcome, not pixel-identical assumptions.",
        "When only Firefox fails, compare application console errors and browser capabilities before adding a browser-specific workaround to the test."
      ],
      "q": "How do you handle a browser-specific defect?",
      "a": "I reproduce the same business flow with controlled inputs across browsers and collect evidence from the failing browser. I distinguish unsupported test configuration from application incompatibility. Any workaround is documented so it does not silently remove the intended coverage.",
      "practice": "Choose three critical claim screens for a small cross-browser suite and justify them.",
      "source": [
        "Selenium · Firefox profiles & browser-specific behavior",
        "https://www.selenium.dev/documentation/webdriver/browsers/firefox/"
      ]
    },
    {
      "title": "Safari coverage & platform constraints",
      "intro": "Safari automation needs a compatible platform and supported driver setup; it is not interchangeable with running any WebKit-derived browser.",
      "points": [
        "Check the official Safari prerequisites on the intended macOS environment before scheduling the suite.",
        "Keep the test scope tied to supported desktop Safari behavior. A desktop session does not prove that the same workflow works on a physical mobile device.",
        "Plan a representative compatibility subset when infrastructure is limited, and report the actual browser and platform tested."
      ],
      "q": "How would you explain the limits of Safari coverage?",
      "a": "I would name the exact browser and platform used and state which scenarios ran. I would not claim iPhone coverage from a desktop Safari run. I would prioritize high-risk controls and flows while keeping unsupported configurations visible in the coverage report.",
      "practice": "Write a precise coverage statement for desktop Safari testing.",
      "source": [
        "Selenium · Safari coverage & platform constraints",
        "https://www.selenium.dev/documentation/webdriver/browsers/safari/"
      ]
    },
    {
      "title": "Element collections & scoped searches",
      "intro": "Finding multiple matching elements is useful only when the expected collection and search scope are clear.",
      "points": [
        "findElements returns a collection that may be empty. findElement expects a match and raises an error when no element is found after applicable waiting.",
        "Scope a search to the correct table, form or component so identical labels elsewhere cannot satisfy the test accidentally.",
        "For dynamic lists, wait for the intended business state before comparing counts. A temporary empty collection is not necessarily the final result."
      ],
      "q": "How would you verify a search returned the expected claims?",
      "a": "I scope the rows to the results table, wait for the completed-search state and compare stable claim identifiers with the expected set. I check both missing and unexpected results rather than relying only on the number of rows.",
      "practice": "Design an assertion that catches the wrong three rows even when the count is correct.",
      "source": [
        "Selenium · Element collections & scoped searches",
        "https://www.selenium.dev/documentation/webdriver/elements/finders/"
      ]
    },
    {
      "title": "Text entry, clear & form interaction",
      "intro": "A form test should verify the final application value, not only that keys were sent.",
      "points": [
        "Use supported element interactions such as clear and sendKeys on appropriate controls. Masked or scripted fields may transform the entered text.",
        "Test blur, validation and formatting behavior where relevant, especially for dates, currency and policy identifiers.",
        "If a field rejects input, inspect its editable state and any overlay rather than immediately replacing user interaction with JavaScript."
      ],
      "q": "How would you test a currency input that formats automatically?",
      "a": "I enter a controlled value using the normal interaction, trigger the required blur or validation, then verify the stored and displayed interpretation. I include precision and boundary cases. Sending characters successfully does not prove that the application accepted the intended amount.",
      "practice": "Create three inputs for a decimal field, including an unsupported format.",
      "source": [
        "Selenium · Text entry, clear & form interaction",
        "https://www.selenium.dev/documentation/webdriver/elements/interactions/"
      ]
    },
    {
      "title": "Element text, properties & attributes",
      "intro": "Displayed text, DOM attributes and current element properties answer different testing questions.",
      "points": [
        "Use visible text when validating a user-facing label. For input values, inspect the relevant current property rather than assuming text content contains the entered value.",
        "Distinguish an original HTML attribute from a property changed by JavaScript. Choose the observation that matches the expected behavior.",
        "State checks such as displayed, enabled or selected are useful prerequisites but do not prove that a completed business transaction is correct."
      ],
      "q": "Why might an input look filled while getText returns empty?",
      "a": "The visible input value is typically a value property rather than a text node inside the element. I inspect the appropriate DOM property and then verify the application outcome after submission. I choose assertions based on how the control represents its state.",
      "practice": "Explain which observation you would use for a checkbox, text input and heading.",
      "source": [
        "Selenium · Element text, properties & attributes",
        "https://www.selenium.dev/documentation/webdriver/elements/information/"
      ]
    },
    {
      "title": "File uploads & test fixtures",
      "intro": "Upload tests combine browser interaction with controlled file content and server-side validation.",
      "points": [
        "For a file input, Selenium can supply a file path rather than manipulating the operating system’s file-picker dialog.",
        "Use small synthetic files with known contents and explicit expected type or size rules. Avoid uploading real customer documents during routine automation.",
        "Verify the resulting document association and stored filename or content, then test rejection and cleanup when an upload is invalid."
      ],
      "q": "What should an upload test assert after selecting a file?",
      "a": "I check the application’s final acceptance or rejection, the correct claim association and relevant metadata. For accepted files, I verify the content through an appropriate interface. Merely setting the file-input value does not establish that the server stored the document.",
      "practice": "Prepare accepted and rejected document fixtures with clearly different contents.",
      "source": [
        "Selenium · File uploads & test fixtures",
        "https://www.selenium.dev/documentation/webdriver/elements/file_upload/"
      ]
    },
    {
      "title": "Navigation, refresh & browser history",
      "intro": "Navigation tests should distinguish browser actions from successful arrival at the intended application state.",
      "points": [
        "Selenium supports forward, back and refresh operations, but each action still needs an assertion about the destination state.",
        "Test whether a refresh loses unsaved form data or resubmits work according to the product requirements.",
        "For single-page applications, a changed URL does not alone prove that new business data loaded. Verify a meaningful page identifier or result."
      ],
      "q": "How would you test browser Back after a claim search?",
      "a": "I would record the starting route and relevant search state, navigate to a result, then go back. I would verify the expected search criteria and results restoration under the requirements. I would also check that returning does not repeat a mutation unintentionally.",
      "practice": "Define expected refresh behavior for a draft form and a completed confirmation page.",
      "source": [
        "Selenium · Navigation, refresh & browser history",
        "https://www.selenium.dev/documentation/webdriver/interactions/navigation/"
      ]
    },
    {
      "title": "JavaScript alerts, confirms & prompts",
      "intro": "Browser dialogs are separate from HTML modals and require different handling.",
      "points": [
        "Use the alert interface for a JavaScript alert, confirmation or prompt. An HTML dialog remains a page element located through the DOM.",
        "Wait for the actual dialog, inspect its message, and accept or dismiss according to the scenario. Enter text only for a supported prompt.",
        "Verify the resulting application state for both confirmation and cancellation; dismissing the dialog must not accidentally execute the protected action."
      ],
      "q": "How do you distinguish a JavaScript alert from an application modal?",
      "a": "I inspect whether it is a browser-managed dialog or DOM content. I use switchTo().alert() for the former and ordinary element interactions for the latter. I verify the text and the business result instead of just clearing the interruption.",
      "practice": "Write separate expected outcomes for confirming and cancelling a deletion dialog.",
      "source": [
        "Selenium · JavaScript alerts, confirms & prompts",
        "https://www.selenium.dev/documentation/webdriver/interactions/alerts/"
      ]
    },
    {
      "title": "Cookies, sessions & authentication state",
      "intro": "Cookie manipulation can support test setup, but it does not replace testing the actual authentication flow.",
      "points": [
        "Cookie operations apply within the relevant browsing context and domain. Treat session values as secrets and avoid placing them in public logs.",
        "Test expired or missing cookies through controlled application behavior. Do not assume deleting one cookie guarantees complete server-side logout.",
        "Keep authentication fixtures separate from tests specifically validating login, logout or session expiry so setup shortcuts do not bypass the behavior under test."
      ],
      "q": "When would you use a cookie-based test setup?",
      "a": "I might use an approved session fixture to avoid repeated UI login in unrelated tests. I would still maintain dedicated authentication coverage and verify the fixture’s validity. I would isolate sessions across tests and protect saved values as credentials.",
      "practice": "Explain why a login test should not start with an already authenticated cookie.",
      "source": [
        "Selenium · Cookies, sessions & authentication state",
        "https://www.selenium.dev/documentation/webdriver/interactions/cookies/"
      ]
    },
    {
      "title": "Frames, nested frames & context restoration",
      "intro": "A frame defines a separate browsing context, so locating its inner controls requires entering the correct context.",
      "points": [
        "Wait for the intended frame and switch into it before interacting with its content. Use a stable frame locator rather than a fragile index.",
        "For nested frames, follow the required hierarchy. Return to the parent or default content before using controls outside that hierarchy.",
        "Test context restoration in reusable helpers so one interaction does not leave later test steps searching the wrong document."
      ],
      "q": "Why can a visible iframe control produce NoSuchElementException?",
      "a": "The driver may still be searching the outer document or the wrong frame. I verify frame structure, enter the correct context and wait for the control. After the operation I restore context deliberately so subsequent steps remain predictable.",
      "practice": "Draw a two-level frame tree and identify the context needed for each control.",
      "source": [
        "Selenium · Frames, nested frames & context restoration",
        "https://www.selenium.dev/documentation/webdriver/interactions/frames/"
      ]
    },
    {
      "title": "Window handles & tab ownership",
      "intro": "A popup introduces a new browser context whose identity must be tracked explicitly.",
      "points": [
        "Record the original handle and compare handle sets after the triggering action. Do not assume the returned handle order identifies the newest tab.",
        "Switch to the intended window and verify its content or URL before acting. Similar tab titles may not uniquely identify the correct context.",
        "Close only windows created or owned by the test, then restore the surviving original handle before continuing or cleaning up."
      ],
      "q": "How would you test a document opening in a new tab?",
      "a": "I record the current handle, trigger the document action and wait for the new handle. I switch to it and verify the intended document context, then close that tab and return. I avoid relying on a fixed handle index or closing every window blindly.",
      "practice": "Write the expected cleanup sequence if the popup assertion fails.",
      "source": [
        "Selenium · Window handles & tab ownership",
        "https://www.selenium.dev/documentation/webdriver/interactions/windows/"
      ]
    },
    {
      "title": "Keyboard actions & modifier release",
      "intro": "Keyboard shortcuts test interaction behavior that simple text entry does not cover.",
      "points": [
        "The Actions API can model key-down and key-up sequences. Release modifiers explicitly so later input is not affected by a held Control or Shift key.",
        "Verify focus before sending shortcuts; the same key combination may perform a different action in another control.",
        "Test keyboard accessibility with the expected business result, such as selecting a suggestion or submitting a form, rather than merely checking that a key event was sent."
      ],
      "q": "How do you investigate a keyboard shortcut acting on the wrong field?",
      "a": "I first verify focus and the current browsing context. Then I inspect the action sequence for missing modifier release and compare it with the intended interaction. I assert the resulting field or page state so an apparently successful key sequence cannot conceal misdirected input.",
      "practice": "Design a keyboard-only path through a search field and its suggestions.",
      "source": [
        "Selenium · Keyboard actions & modifier release",
        "https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/"
      ]
    },
    {
      "title": "Mouse gestures, hover & drag behavior",
      "intro": "Complex pointer gestures require a deliberate target and an observable result.",
      "points": [
        "Use the Actions API for hover, press, movement and release sequences when the application requires them.",
        "For hover menus, wait for the revealed item before clicking. For drag operations, verify the final ordering or assigned container rather than the pointer coordinates alone.",
        "Investigate overlays, scrolling and changing layout when a gesture fails. Repeated coordinate offsets can conceal an incorrect target or responsive-layout difference."
      ],
      "q": "How would you verify drag-and-drop succeeded?",
      "a": "I would check the application’s resulting data or element order and, where appropriate, its persisted state. A completed pointer movement is not proof of acceptance. I would include a prohibited drop target and verify the original item remains valid when the operation is rejected.",
      "practice": "Define success and rejection assertions for moving a task between columns.",
      "source": [
        "Selenium · Mouse gestures, hover & drag behavior",
        "https://www.selenium.dev/documentation/webdriver/actions_api/mouse/"
      ]
    },
    {
      "title": "Scrolling & virtualized content",
      "intro": "Scrolling can reveal content, but virtualized lists may create and remove DOM elements as the viewport changes.",
      "points": [
        "Use supported scrolling actions with the correct scroll container. Scrolling the page may not move a nested results panel.",
        "For lazy-loaded content, wait for a meaningful item or load indicator rather than assuming one scroll loads every record.",
        "Validate virtualized lists using stable identifiers and the application’s data contract. Counting currently rendered rows may not equal the total result count."
      ],
      "q": "Why is DOM row count unreliable in a virtualized table?",
      "a": "Only a window of rows may be rendered at one time, and those nodes can be reused while scrolling. I verify the intended business identifiers and total-count contract separately. I avoid treating every row not currently in the DOM as a missing record.",
      "practice": "Design a test to find a specific claim in a long virtualized list.",
      "source": [
        "Selenium · Scrolling & virtualized content",
        "https://www.selenium.dev/documentation/webdriver/actions_api/wheel/"
      ]
    },
    {
      "title": "Native select lists & custom dropdowns",
      "intro": "Native select controls and custom dropdown widgets expose different interaction models.",
      "points": [
        "Selenium’s Select helper applies to HTML select elements. A custom menu built from other elements requires ordinary locators and interactions.",
        "Choose options using a stable value or expected label, and verify the selected result. Index-based selection is fragile when options are reordered.",
        "Test disabled options, defaults and multiselect behavior only when supported. Confirm that a selection triggers the expected dependent fields or validation."
      ],
      "q": "Why would the Select helper fail on a visible dropdown?",
      "a": "The control may be a custom widget rather than an HTML select element. I inspect its markup and use the appropriate interaction path. I verify both the chosen label and the resulting business value, especially when labels differ from submitted codes.",
      "practice": "Compare how you would select a state in native and custom controls.",
      "source": [
        "Selenium · Native select lists & custom dropdowns",
        "https://www.selenium.dev/documentation/webdriver/support_features/select_lists/"
      ]
    },
    {
      "title": "Thread ownership & driver safety",
      "intro": "Parallel browser execution needs explicit driver ownership, not just more threads.",
      "points": [
        "ThreadGuard can detect access from a different thread in Java, but it does not replace a design that gives each test invocation its own driver.",
        "Do not share one mutable driver through static fields. Keep setup, use and cleanup consistent with the test’s execution scope.",
        "Test resource cleanup when setup or assertions fail so abandoned sessions do not accumulate and make later tests unreliable."
      ],
      "q": "Does ThreadGuard make a shared driver safe for parallel tests?",
      "a": "No. It helps detect incorrect thread access, while isolation still requires the framework to manage separate sessions and appropriate references. I also isolate test data because independent drivers alone do not prevent two tests from modifying the same claim.",
      "practice": "Sketch driver ownership for two tests running simultaneously.",
      "source": [
        "Selenium · Thread ownership & driver safety",
        "https://www.selenium.dev/documentation/webdriver/support_features/thread_guard/"
      ]
    },
    {
      "title": "Selenium Manager & driver availability",
      "intro": "Driver management is an environment concern that should be verified before diagnosing page-level failures.",
      "points": [
        "Selenium Manager supports automated browser and driver management in supported situations. Network, cache and environment restrictions still affect availability.",
        "For controlled CI environments, document how required binaries are provisioned and which versions are expected rather than relying on an unexplained developer cache.",
        "Record startup errors separately from test assertions. A failed download or unavailable browser does not prove a defect in claim creation."
      ],
      "q": "What would you check when a driver cannot be obtained in CI?",
      "a": "I inspect the approved binary-provisioning method, network access, cache permissions and required versions. I compare the runner with the working environment and preserve startup diagnostics. I resolve the environment issue before changing business assertions or adding retries to the test.",
      "practice": "List evidence that distinguishes a driver-download failure from a page timeout.",
      "source": [
        "Selenium · Selenium Manager & driver availability",
        "https://www.selenium.dev/documentation/selenium_manager/"
      ]
    },
    {
      "title": "Grid capacity & execution planning",
      "intro": "Grid distributes browser sessions, but useful concurrency depends on available capacity and the application environment.",
      "points": [
        "Use Grid when remote browser distribution or multiple platform combinations fit the test strategy. It does not make a serial test scenario automatically parallel.",
        "Match requested browser capabilities to available nodes and track session-queue time separately from application response time.",
        "Increase concurrency gradually while watching environment capacity and data isolation. More simultaneous sessions can create contention that obscures useful results."
      ],
      "q": "How would you decide the worker count for a Grid suite?",
      "a": "I consider available browser slots, application capacity and independent test data. I measure queue and execution times, then increase concurrency while monitoring failures. I avoid selecting a thread count solely from the number of tests or the runner’s CPU count.",
      "practice": "Create a capacity plan for twenty smoke tests and four browser slots.",
      "source": [
        "Selenium · Grid capacity & execution planning",
        "https://www.selenium.dev/documentation/grid/applicability/"
      ]
    },
    {
      "title": "Independent browser state & repeatable tests",
      "intro": "Repeatability requires control of both browser state and backend data.",
      "points": [
        "A new browser session helps isolate cookies and local storage, but it does not remove server-side records created by previous tests.",
        "Give each scenario identifiable data and clean up only records it owns. Keep prerequisites explicit so a test can run alone.",
        "Check random-order or isolated execution when investigating tests that pass only after another test has run."
      ],
      "q": "How can a test leak state despite using a fresh browser?",
      "a": "It may update shared accounts, leave backend records or rely on external queues and files. I trace both client and server state, give each run unique identifiers and make cleanup ownership explicit. I then rerun the scenario alone to verify that no hidden prerequisite remains.",
      "practice": "Identify three state leaks outside browser cookies and propose controls.",
      "source": [
        "Selenium · Independent browser state & repeatable tests",
        "https://www.selenium.dev/documentation/test_practices/encouraged/avoid_sharing_state/"
      ]
    },
    {
      "title": "Fluent test APIs & readable business actions",
      "intro": "A fluent interface can make a scenario readable when each chained operation has a clear meaning.",
      "points": [
        "Return an appropriate page or component type from operations that transition the UI. The return type should reflect the resulting context.",
        "Keep method names aligned with user intentions, such as openClaim or submitLoss, without hiding important setup or assertions in surprising side effects.",
        "Avoid very long chains that make failures hard to locate. Readability and diagnostic clarity matter more than minimizing line count."
      ],
      "q": "When would you avoid fluent chaining?",
      "a": "I avoid it when a chain hides branching, expensive setup or distinct checkpoints that need separate evidence. I prefer clear intermediate variables and assertions when they make the business flow easier to understand. A fluent API is a readability choice, not a requirement for a good framework.",
      "practice": "Rewrite a long UI chain as three meaningful actions with checkpoints.",
      "source": [
        "Selenium · Fluent test APIs & readable business actions",
        "https://www.selenium.dev/documentation/test_practices/encouraged/consider_using_a_fluent_api/"
      ]
    },
    {
      "title": "CAPTCHA & test-environment boundaries",
      "intro": "CAPTCHA is designed to distinguish automated interaction, so ordinary functional tests need an approved testing arrangement.",
      "points": [
        "Use a documented non-production mechanism or provider test mode when the team supports one. Do not make automated CAPTCHA solving part of a functional smoke suite.",
        "Keep the production protection enabled and verify integration behavior through the approved testing contract.",
        "Separate the protected feature’s business validation from checks of the CAPTCHA integration so neither concern silently disappears from coverage."
      ],
      "q": "How do you automate a form protected by CAPTCHA?",
      "a": "I ask the team for an approved test-environment mechanism or official provider testing mode. I use that for routine form coverage and maintain appropriate integration checks separately. I do not disable production security or claim that bypassed tests validate the CAPTCHA challenge itself.",
      "practice": "Document the distinction between form validation coverage and CAPTCHA integration coverage.",
      "source": [
        "Selenium · CAPTCHA & test-environment boundaries",
        "https://www.selenium.dev/documentation/test_practices/discouraged/captchas/"
      ]
    },
    {
      "title": "Downloads & choosing the right verification layer",
      "intro": "A download workflow includes a UI trigger and a file result, which may be best validated through different interfaces.",
      "points": [
        "Selenium can trigger the UI action, but reliable file verification may require a supported HTTP client or controlled filesystem mechanism outside WebDriver.",
        "Verify file identity, format and meaningful contents. A matching filename or nonzero size alone cannot prove that the expected report was generated.",
        "Keep download directories unique to the run and avoid confusing a stale file with a new result. Plan remote-node ownership explicitly."
      ],
      "q": "How would you validate a downloaded claim report?",
      "a": "I would verify the authorized UI flow and retrieve the file using a controlled supported mechanism. I would check headers or format and selected business records, using a unique destination to avoid stale files. I would report clearly which checks exercised the browser and which inspected the artifact.",
      "practice": "Specify assertions for a CSV report with an expected claim identifier and amount.",
      "source": [
        "Selenium · Downloads & choosing the right verification layer",
        "https://www.selenium.dev/documentation/test_practices/discouraged/file_downloads/"
      ]
    }
  ],
  "playwright": [
    {
      "title": "Runner configuration & test discovery",
      "intro": "Configuration determines which tests run and what evidence a run produces.",
      "points": [
        "Keep test-directory, matching, worker and reporter settings in the appropriate configuration fields. Browser-context options belong under use.",
        "Enable safeguards against accidentally committed focused tests in CI. A green run containing only one selected test can hide lost coverage.",
        "Review the discovered test list when adding folders or naming conventions so files are not silently excluded."
      ],
      "q": "A new test never runs in CI. What would you check?",
      "a": "I inspect test discovery patterns, project selection, ignore rules and the actual command. I compare the discovered list with the intended suite before debugging the test body. I also check focused or skipped tests and confirm the correct configuration file was loaded.",
      "practice": "Document how your suite discovers a newly added spec file.",
      "source": [
        "Playwright · Runner configuration & test discovery",
        "https://playwright.dev/docs/test-configuration"
      ]
    },
    {
      "title": "Context options, baseURL & environment selection",
      "intro": "Context settings help tests express the intended environment without scattering configuration through every scenario.",
      "points": [
        "A configured baseURL supports relative navigation and request URLs. Keep environment selection explicit so a test cannot accidentally target production.",
        "Set locale, viewport and other supported context options according to the scenario rather than inheriting an unpredictable workstation setup.",
        "Keep sensitive values in approved environment or secret mechanisms, and avoid exposing authorization headers in diagnostic output."
      ],
      "q": "Why configure a baseURL instead of hard-coding URLs?",
      "a": "It makes environment selection centralized and keeps tests focused on application paths. I still validate the selected environment before mutations and record it in reports. Relative paths alone do not protect against an incorrectly configured production URL.",
      "practice": "Design a local and test-environment configuration with a clear selection mechanism.",
      "source": [
        "Playwright · Context options, baseURL & environment selection",
        "https://playwright.dev/docs/test-use-options"
      ]
    },
    {
      "title": "Device emulation & responsive coverage",
      "intro": "Device emulation changes browser characteristics but does not reproduce every property of real hardware.",
      "points": [
        "Use documented device profiles or deliberate viewport and input settings to test responsive layouts.",
        "Verify navigation, focus order and important controls at representative breakpoints, including content that wraps or disappears.",
        "State the coverage limit: emulated mobile behavior is not proof of physical-device performance, operating-system integration or every browser variation."
      ],
      "q": "What should a mobile-emulation test verify?",
      "a": "I would check the intended responsive layout and critical interactions at a named profile or viewport. I would verify that controls remain usable and important information is available. I would separately report any real-device behaviors that emulation cannot establish.",
      "practice": "Choose three breakpoint scenarios for a policy-search page and explain their risks.",
      "source": [
        "Playwright · Device emulation & responsive coverage",
        "https://playwright.dev/docs/emulation"
      ]
    },
    {
      "title": "Parameterized scenarios & unique test names",
      "intro": "Data-driven tests should produce identifiable results for each business case.",
      "points": [
        "Generate tests from controlled input and expected-result rows when the same behavior needs several examples.",
        "Use unique descriptive names so reports reveal the failing boundary or rule. Do not hide all cases inside one loop with one final assertion.",
        "Keep setup and cleanup scoped correctly for each generated test, particularly when data rows mutate independent records."
      ],
      "q": "How would you parameterize validation of claim amounts?",
      "a": "I define named rows for valid and invalid boundaries and create an independent test for each row. I include the expected outcome with the input and avoid sharing mutable claim data. This makes failures specific and allows one case to run independently.",
      "practice": "Create four named amount cases, including both sides of a boundary.",
      "source": [
        "Playwright · Parameterized scenarios & unique test names",
        "https://playwright.dev/docs/test-parameterize"
      ]
    },
    {
      "title": "Projects & a deliberate browser matrix",
      "intro": "A project is a named configuration that can apply the same tests under different conditions.",
      "points": [
        "Use projects for browser combinations, device profiles or other meaningful configuration differences.",
        "Keep the matrix tied to product risk and supported environments. Repeating every expensive scenario in every project may waste capacity without equivalent value.",
        "Verify project-specific setup, test matching and dependencies so a selected project does not silently omit prerequisites."
      ],
      "q": "How would you organize Chromium and Firefox coverage?",
      "a": "I would define named projects with the intended settings and select a risk-based test scope. I would inspect reports by project so one browser’s pass cannot hide another’s failure. I would keep common business expectations consistent while documenting legitimate platform differences.",
      "practice": "Design a two-browser smoke matrix and a larger scheduled regression matrix.",
      "source": [
        "Playwright · Projects & a deliberate browser matrix",
        "https://playwright.dev/docs/test-projects"
      ]
    },
    {
      "title": "Reporters & actionable attachments",
      "intro": "A report should help someone understand a failure without reconstructing the original test session.",
      "points": [
        "Choose output formats for their consumers, such as an interactive report for diagnosis and structured results for CI ingestion.",
        "Attach useful evidence with meaningful names and protect screenshots or logs that may contain test credentials or sensitive information.",
        "Keep test names, project names and environment metadata clear enough to distinguish repeated runs and configurations."
      ],
      "q": "What makes an automation report useful?",
      "a": "It identifies the failed expectation, scenario data, environment and relevant artifacts. I prefer a concise failure message supported by trace or screenshot evidence over a large unstructured log. I also make retry outcomes visible so a final pass does not erase instability.",
      "practice": "Write an example failure message for a claim linked to the wrong policy.",
      "source": [
        "Playwright · Reporters & actionable attachments",
        "https://playwright.dev/docs/test-reporters"
      ]
    },
    {
      "title": "Retries & honest flaky-test outcomes",
      "intro": "A retry can reveal intermittency, but it must not redefine an unreliable test as healthy.",
      "points": [
        "Configure retries deliberately and review the distinction between initial failure and eventual success.",
        "Design setup to tolerate a repeated test without reusing partially mutated records from the earlier attempt.",
        "Track recurring flaky outcomes with an owner and root-cause investigation. Increasing retries increases runtime and can conceal a real product race."
      ],
      "q": "What would you do with a test that passes on its second attempt?",
      "a": "I would retain both outcomes and inspect evidence from the first failure. I would check timing, shared data and environment instability before deciding the cause. I would fix the underlying problem or explicitly track the coverage risk instead of counting the retry as proof of reliability.",
      "practice": "Explain how a retry could accidentally submit the same payment twice.",
      "source": [
        "Playwright · Retries & honest flaky-test outcomes",
        "https://playwright.dev/docs/test-retries"
      ]
    },
    {
      "title": "Sharding & distributed test execution",
      "intro": "Sharding divides a suite across multiple jobs; it does not remove the need for isolated test resources.",
      "points": [
        "Assign each shard its intended portion and verify that all expected shards execute before interpreting the overall result.",
        "Give artifacts and test data unique run or shard identifiers to prevent collisions between jobs.",
        "Merge supported report outputs deliberately and investigate missing results, rather than treating one successful shard as the suite result."
      ],
      "q": "How would you verify a sharded run is complete?",
      "a": "I compare the expected shard set and test inventory with collected results. I check job failures, missing artifacts and duplicate execution. I also ensure cleanup is scoped to each run so one shard cannot remove another shard’s active data.",
      "practice": "Plan artifact names and data prefixes for a three-shard regression run.",
      "source": [
        "Playwright · Sharding & distributed test execution",
        "https://playwright.dev/docs/test-sharding"
      ]
    },
    {
      "title": "Test, action & assertion timeouts",
      "intro": "Timeouts bound different operations and should express realistic expectations.",
      "points": [
        "Distinguish the whole-test budget from an individual action or retrying assertion timeout.",
        "When a timeout occurs, identify the condition that was never met before increasing the limit. A wrong locator will not become correct with more time.",
        "Allow for approved slow operations without making every check equally slow. Capture the last observable state when a business operation misses its deadline."
      ],
      "q": "Why can increasing the test timeout fail to fix an assertion timeout?",
      "a": "The assertion may have its own shorter limit. I identify which timeout fired and inspect the awaited condition. I change the relevant budget only when evidence supports the expected duration; otherwise I correct synchronization, data or the application defect.",
      "practice": "Classify a login timeout, a slow upload and an absent confirmation into the relevant budgets.",
      "source": [
        "Playwright · Test, action & assertion timeouts",
        "https://playwright.dev/docs/test-timeouts"
      ]
    },
    {
      "title": "Type checking & runtime validation",
      "intro": "TypeScript helps describe assumptions, but test execution and static type checking are separate concerns.",
      "points": [
        "Run an explicit type-check command in the development or CI workflow rather than assuming executing tests catches every type error.",
        "Use specific types for helper inputs and avoid any where it hides expected fields or optional values.",
        "Validate untrusted API responses at runtime when their shape matters; a type assertion does not transform or verify a received payload."
      ],
      "q": "Does declaring an API response type prove the server returned that shape?",
      "a": "No. The declaration informs the compiler but does not validate the runtime response. I inspect or validate the required fields and business values explicitly, and run static type checking separately to catch mistakes in the test code itself.",
      "practice": "Explain the difference between a TypeScript cast and a schema validation.",
      "source": [
        "Playwright · Type checking & runtime validation",
        "https://playwright.dev/docs/test-typescript"
      ]
    },
    {
      "title": "Managed web servers & readiness",
      "intro": "Tests need a known application instance that is ready before browser interaction begins.",
      "points": [
        "Use the runner’s webServer configuration when starting a local application fits the workflow.",
        "Choose a meaningful readiness URL and keep local reuse separate from clean CI startup to avoid testing a stale developer process.",
        "Capture startup failure separately from test assertions. A server that never started should not produce dozens of misleading page-navigation defects."
      ],
      "q": "How would you avoid testing an old local build?",
      "a": "I would make server reuse a deliberate local option and use a clean, controlled startup in CI. I would verify the target URL and, when available, build identity. I would inspect readiness and startup logs before interpreting browser failures.",
      "practice": "Define a readiness check that distinguishes a running process from a usable application.",
      "source": [
        "Playwright · Managed web servers & readiness",
        "https://playwright.dev/docs/test-webserver"
      ]
    },
    {
      "title": "Accessibility scans & manual checks",
      "intro": "Automated accessibility checks identify useful problems but cannot establish complete usability on their own.",
      "points": [
        "Integrate a supported accessibility scanner and evaluate the page after the meaningful UI state has loaded.",
        "Run checks on dialogs, validation errors and expanded components as well as the initial page.",
        "Complement automated rules with keyboard navigation and human assessment of understandable labels, focus movement and task completion."
      ],
      "q": "Can a passing accessibility scan prove the site is fully accessible?",
      "a": "No. It covers only the rules the scanner can evaluate in the inspected state. I combine it with keyboard and relevant assistive-technology checks, and I inspect dynamic states. I report the scope honestly rather than treating zero detected violations as complete certification.",
      "practice": "Choose a claim form state that requires a separate scan after interaction.",
      "source": [
        "Playwright · Accessibility scans & manual checks",
        "https://playwright.dev/docs/accessibility-testing"
      ]
    },
    {
      "title": "Form controls & intentional input methods",
      "intro": "Choose an input method that matches the behavior being tested.",
      "points": [
        "Use fill for ordinary text replacement and the relevant checked or selected-state operations for supported controls.",
        "Use sequential key input only when individual keyboard events are part of the requirement, such as an autocomplete behavior.",
        "Verify the final interpreted value and validation outcome for masked dates or amounts; sending a string is not proof it was accepted correctly."
      ],
      "q": "When would you type character by character instead of filling a field?",
      "a": "I would do it when the scenario specifically depends on key events or incremental suggestions. For ordinary form setup, fill is clearer and faster. In both cases I verify the resulting value or application state rather than assuming the input action proves success.",
      "practice": "Compare input strategies for a plain name field and a search-as-you-type control.",
      "source": [
        "Playwright · Form controls & intentional input methods",
        "https://playwright.dev/docs/input"
      ]
    },
    {
      "title": "Authentication state & account isolation",
      "intro": "Reusing authentication can speed unrelated tests, but account ownership and credential protection remain essential.",
      "points": [
        "Store authenticated state only through approved test mechanisms and exclude state files containing credentials from source control.",
        "Use separate accounts when tests mutate shared server state. Separate browser contexts using the same account may still interfere with each other.",
        "Keep dedicated login, logout and expiry tests independent of authenticated-state shortcuts so the real flow remains covered."
      ],
      "q": "Why might two isolated contexts still interfere after loading the same authentication state?",
      "a": "They may represent the same server-side account and modify shared preferences, claims or session state. I isolate mutable accounts or records and reserve shared authentication for scenarios that can safely use it. Browser isolation alone does not guarantee backend independence.",
      "practice": "Design an account strategy for three parallel tests that update user settings.",
      "source": [
        "Playwright · Authentication state & account isolation",
        "https://playwright.dev/docs/auth"
      ]
    },
    {
      "title": "Browser installation & version alignment",
      "intro": "The test package and browser binaries must form a supported, reproducible environment.",
      "points": [
        "Install the browsers and system dependencies required by the chosen Playwright version and CI image.",
        "Record actual browser projects and versions when investigating differences; a system-installed browser may differ from the managed binary.",
        "Keep the lockfile and CI setup consistent so a clean run does not depend on a developer’s old browser cache."
      ],
      "q": "A runner reports that a browser executable is missing. What do you do?",
      "a": "I inspect the installation step, cache and selected browser project, then provision the supported binary through the documented workflow. I also verify required system dependencies. I do not change application tests to work around an environment that cannot launch its browser.",
      "practice": "Write a short environment-readiness checklist for a clean CI agent.",
      "source": [
        "Playwright · Browser installation & version alignment",
        "https://playwright.dev/docs/browsers"
      ]
    },
    {
      "title": "Clock control & time-dependent UI",
      "intro": "Controlled browser time makes time-sensitive UI behavior reproducible without waiting for real minutes or days.",
      "points": [
        "Use supported clock controls for browser timers and time when the test requires them, installing control at the appropriate point.",
        "Distinguish client time from server time. Advancing the browser clock does not automatically advance an external billing service or database clock.",
        "Test boundary behavior such as an expiring notification with known timestamps and verify that cleanup restores normal isolation for other tests."
      ],
      "q": "Why might advancing browser time fail to expire a server session?",
      "a": "The server may evaluate expiry using its own clock and persisted state. Browser clock control affects the browser-side behavior under its scope. I identify which system owns the rule and use an approved server-side test mechanism or fixture when necessary.",
      "practice": "Split a countdown-display test from a server-enforced session-expiry test.",
      "source": [
        "Playwright · Clock control & time-dependent UI",
        "https://playwright.dev/docs/clock"
      ]
    },
    {
      "title": "Dialogs & event-handler completion",
      "intro": "A browser dialog can block the triggering action unless the expected event is handled correctly.",
      "points": [
        "Register the relevant dialog handler before triggering the action that opens the dialog.",
        "A registered handler must accept or dismiss as appropriate; logging the message without resolving the dialog can leave the action waiting.",
        "Assert both the dialog message and the business result, including the cancellation path for operations that should not proceed."
      ],
      "q": "Why can a click hang after you add a dialog listener?",
      "a": "The listener may observe the dialog without accepting or dismissing it. I handle the expected dialog before triggering the click and resolve it according to the test. I then verify whether the underlying operation was completed or cancelled correctly.",
      "practice": "Design accept and dismiss tests for a browser confirmation.",
      "source": [
        "Playwright · Dialogs & event-handler completion",
        "https://playwright.dev/docs/dialogs"
      ]
    },
    {
      "title": "Downloads & artifact verification",
      "intro": "Download tests need to capture the event and verify the resulting file, not just click a link.",
      "points": [
        "Start waiting for the download before the triggering action so a fast event is not missed.",
        "Save or inspect the downloaded artifact through supported APIs and use a destination unique to the test run.",
        "Check meaningful file content, format and identity. A correct filename alone cannot detect an empty report or data for the wrong claim."
      ],
      "q": "How would you test a downloaded policy document?",
      "a": "I capture the download event, retain the artifact and verify its expected format and key policy details using an appropriate parser. I use synthetic data and an isolated destination. I also test the visible error outcome when generation is rejected.",
      "practice": "List three content assertions for a downloaded claim CSV.",
      "source": [
        "Playwright · Downloads & artifact verification",
        "https://playwright.dev/docs/downloads"
      ]
    },
    {
      "title": "Browser evaluation & execution-context boundaries",
      "intro": "Test code and page JavaScript execute in different environments.",
      "points": [
        "Code evaluated in the page can access the page’s browser context, while Node-side helpers and variables are not automatically available there.",
        "Pass serializable arguments explicitly and use evaluation for a justified observation or setup rather than bypassing the user interaction under test.",
        "Avoid replacing clicks with direct internal state changes when the purpose is to validate that the UI interaction works."
      ],
      "q": "When is page evaluation appropriate in a test?",
      "a": "I use it for a specific browser-side observation or controlled setup that is outside the interaction being validated. I keep the boundary explicit and do not use it to force a successful state after a broken UI action. The final business expectation still needs an independent assertion.",
      "practice": "Explain why directly setting application state would weaken a button-click test.",
      "source": [
        "Playwright · Browser evaluation & execution-context boundaries",
        "https://playwright.dev/docs/evaluating"
      ]
    },
    {
      "title": "Events, listeners & race-free synchronization",
      "intro": "Fast events can be missed if observation begins after the triggering action.",
      "points": [
        "Create the event-wait promise before the action for events such as a popup or download.",
        "Match the intended event precisely and remove long-lived listeners when their purpose is complete.",
        "Use bounded waiting and capture useful context on failure. An unrelated event should not satisfy synchronization for the current business operation."
      ],
      "q": "What is the common race when waiting for a popup?",
      "a": "If I click first and start waiting afterward, the popup event may already have fired. I prepare the wait, perform the click and then await the result. I verify the popup’s identity before interacting with it so another window cannot satisfy the test accidentally.",
      "practice": "Write the ordering of observe, trigger, await and assert for an export action.",
      "source": [
        "Playwright · Events, listeners & race-free synchronization",
        "https://playwright.dev/docs/events"
      ]
    },
    {
      "title": "Frame locators & embedded workflows",
      "intro": "Embedded pages have their own document context and require explicitly scoped interactions.",
      "points": [
        "Use frameLocator or another supported frame API to target the intended iframe before locating its controls.",
        "Keep frame selectors stable and handle nested frames deliberately. Identical labels in the host page must not match embedded controls accidentally.",
        "Verify communication outcomes at the appropriate level, such as an embedded form submission updating a host-page status."
      ],
      "q": "How would you test an embedded payment form without selecting the host page’s similarly named field?",
      "a": "I scope the locator to the intended iframe, then use the field’s label within that frame. I assert the form’s result and the host page’s expected confirmation separately. I use an approved test payment environment and synthetic inputs.",
      "practice": "Map the host and embedded assertions for a document-upload iframe.",
      "source": [
        "Playwright · Frame locators & embedded workflows",
        "https://playwright.dev/docs/frames"
      ]
    },
    {
      "title": "Browser contexts & multi-user scenarios",
      "intro": "A context provides an isolated browser session, which is useful for testing interactions between different users.",
      "points": [
        "Create distinct contexts for two users when cookies and browser storage must remain separate.",
        "Use different approved test accounts and controlled records to model ownership or authorization boundaries.",
        "Close created contexts and resources even after a failure. Context isolation does not remove shared backend data or undo business mutations."
      ],
      "q": "How would you test that one adjuster cannot access another user’s restricted claim?",
      "a": "I would establish separate authenticated contexts for authorized and unauthorized users, then attempt the relevant UI or API access using the same controlled claim identifier. I would verify actual denial and absence of sensitive content rather than only a hidden navigation link.",
      "practice": "Design a two-user authorization scenario with a positive control.",
      "source": [
        "Playwright · Browser contexts & multi-user scenarios",
        "https://playwright.dev/docs/browser-contexts"
      ]
    },
    {
      "title": "API mocking & honest test scope",
      "intro": "Mocking makes UI states controllable while changing what the test can prove.",
      "points": [
        "Register the route before the request and provide a response consistent with the agreed contract.",
        "Use mocks for deterministic empty, error or edge-case states that are difficult to generate through the live dependency.",
        "Maintain real integration coverage separately. A mocked success response cannot establish that the backend accepts a request or calculates correct values."
      ],
      "q": "What should you say when a UI test passes against a mocked claims API?",
      "a": "It shows that the UI handled the supplied response under that test setup. It does not prove the real claims service produces the same response or persists the operation. I document the mocked boundary and add suitable contract or integration checks for the actual service.",
      "practice": "Create one empty-result and one server-error mock scenario.",
      "source": [
        "Playwright · API mocking & honest test scope",
        "https://playwright.dev/docs/mock"
      ]
    },
    {
      "title": "Navigation readiness & application hydration",
      "intro": "A loaded document does not always mean the application is ready for the intended interaction.",
      "points": [
        "Assert a meaningful destination URL or visible application state after navigation, especially when redirects are expected.",
        "Consider hydration: a control may appear before the application has attached its event behavior. Diagnose this rather than adding arbitrary sleeps.",
        "Use the product’s observable readiness signals and verify the resulting state after an action, not only that navigation completed."
      ],
      "q": "A button is clicked but nothing happens immediately after navigation. What would you inspect?",
      "a": "I would check whether the application was still hydrating or initializing, whether an overlay intercepted the interaction and whether the expected handler was ready. I would identify a meaningful readiness condition and preserve evidence of the failed result. I would also consider an application defect in premature interactivity.",
      "practice": "Define a useful readiness signal for a claim dashboard.",
      "source": [
        "Playwright · Navigation readiness & application hydration",
        "https://playwright.dev/docs/navigations"
      ]
    },
    {
      "title": "Multiple pages & popup lifecycle",
      "intro": "A browser context can contain several pages, and each page must be associated with the intended workflow.",
      "points": [
        "Capture a new page or popup using the relevant event before triggering it, then verify its identity.",
        "Keep references to the original and new pages rather than assuming a tab order.",
        "Close only test-owned pages and retain evidence from the failing page. Sharing a context means tabs can share session state even though they are different pages."
      ],
      "q": "Are two pages in one context equivalent to two independent users?",
      "a": "No. They share the context’s browser state, including relevant cookies. I use separate contexts for independent users and multiple pages for tabs within one session. I verify popup identity and clean up the page I created without closing unrelated workflow tabs.",
      "practice": "Explain whether a customer and adjuster scenario needs two pages or two contexts.",
      "source": [
        "Playwright · Multiple pages & popup lifecycle",
        "https://playwright.dev/docs/pages"
      ]
    },
    {
      "title": "Screenshots as diagnostic evidence",
      "intro": "A screenshot records a visual state but needs context to become useful failure evidence.",
      "points": [
        "Capture the relevant viewport, element or full page according to the investigation, and name artifacts so the test and step are clear.",
        "Avoid including sensitive fields unnecessarily. Masking for evidence should not change the business behavior under test.",
        "Use screenshots alongside assertions and other evidence; a picture alone may not reveal incorrect persisted values or hidden authorization failures."
      ],
      "q": "What screenshot would you attach to a failed search test?",
      "a": "I would show the query, relevant result region and any visible error in enough context to understand the failure. I would pair it with expected and actual identifiers and the environment. I would avoid a tightly cropped image that hides the route or selected filters.",
      "practice": "Choose evidence for an incorrect result count and explain its limits.",
      "source": [
        "Playwright · Screenshots as diagnostic evidence",
        "https://playwright.dev/docs/screenshots"
      ]
    },
    {
      "title": "Visual baselines & controlled comparisons",
      "intro": "Visual assertions are useful when differences are evaluated against a trustworthy, controlled baseline.",
      "points": [
        "Keep browser, platform, fonts and viewport consistent enough for meaningful comparisons.",
        "Handle known dynamic regions deliberately, and inspect unexpected changes rather than automatically accepting new snapshots.",
        "A visual match cannot replace business assertions about data and permissions. Use visual checks for layout and appearance risks where they add value."
      ],
      "q": "When should you update a screenshot baseline?",
      "a": "I update it after confirming the change is intentional and reviewing the relevant product expectation. I investigate unexpected differences first and retain business assertions independently. Automatically accepting every changed image turns the baseline into a record of whatever happened, not a useful regression check.",
      "practice": "Describe how you would review a changed invoice-layout baseline.",
      "source": [
        "Playwright · Visual baselines & controlled comparisons",
        "https://playwright.dev/docs/test-snapshots"
      ]
    }
  ],
  "testng": [
    {
      "title": "Suite XML and test boundaries",
      "intro": "A suite contains named XML test configurations, each of which can select classes and supply its own settings.",
      "points": [
        "Give each XML test a descriptive name such as Chrome claim smoke so its results remain recognizable.",
        "List classes or packages intentionally and compare discovered methods with the smoke inventory.",
        "If two configurations use different accounts, scope the clients and their credentials to the correct configuration."
      ],
      "q": "Why would a passing suite execute fewer methods than expected?",
      "a": "I inspect the selected XML file, class list, group filters and build command. I compare the actual method names with the expected smoke inventory. A successful exit has little value if payment tests were never selected.",
      "practice": "Sketch two XML tests that run the same search class with different browser choices.",
      "source": [
        "TestNG · Suite XML and test boundaries",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/xml/XmlSuite.html"
      ]
    },
    {
      "title": "XML parameters and overrides",
      "intro": "Two XML tests can use the same parameter name yet intentionally supply different values. Its effective scope matters when diagnosing configuration failures.",
      "points": [
        "Set a suite-wide locale and override it in one XML test. Assert the language rendered by each browser.",
        "Declare parameters in the order expected by the annotated method. Exercise a missing value using a deliberately incomplete suite.",
        "Record the resolved locale with results so a configuration defect can be traced even when both runs otherwise pass."
      ],
      "q": "How would you find out why a French-language test opened an English page?",
      "a": "I compare parameter values at suite and test scope, then inspect the value actually consumed by the browser factory. I verify the page language separately because correct configuration alone does not prove correct rendering.",
      "practice": "Build a two-test example with one inherited locale and one local override.",
      "source": [
        "TestNG · XML parameters and overrides",
        "https://testng.org/parameters.html"
      ]
    },
    {
      "title": "Optional parameters and fail-fast setup",
      "intro": "An optional parameter supplies a deliberate default when an XML value is absent. Which settings may default is a test-design decision.",
      "points": [
        "Use a harmless default for report verbosity while keeping mutation-sensitive environment selection explicit.",
        "Exercise a valid provided value, an absent value and an invalid provided value as distinct cases.",
        "Validate allowed values during setup and identify the configuration key in an error while protecting secret values."
      ],
      "q": "Should a missing target environment automatically select a default server?",
      "a": "For a local read-only exercise I might use an explicitly documented default. For tests that modify claims I require a valid target and stop during setup when it is absent. I check that failed setup created no test records.",
      "practice": "Choose one setting that may default and one that must be present. Explain each choice.",
      "source": [
        "TestNG · Optional parameters and fail-fast setup",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Optional.html"
      ]
    },
    {
      "title": "Expected exceptions and precise negative tests",
      "intro": "A negative test should fail if the operation succeeds and should pass only for the intended error.",
      "points": [
        "Keep prerequisite setup outside the expression whose exception you expect, and choose a specific exception type.",
        "Check the message or domain error code when it distinguishes business-rule failures sharing an exception class.",
        "Follow the failure with a state check where possible. A rejected reserve update should leave the earlier reserve amount intact."
      ],
      "q": "How could an expected-exception test pass for the wrong reason?",
      "a": "A setup step might throw the same exception as the target operation. I scope the check to the operation, inspect useful error details and verify unchanged state. I include a nearby valid value to prove the test exercises the intended boundary.",
      "practice": "Design one test for a rejected negative reserve and another for an accepted zero reserve under a fictional rule.",
      "source": [
        "TestNG · Expected exceptions and precise negative tests",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/Assert.html"
      ],
      "code": "@Test\npublic void invalidPolicyNumberReportsError() {\n    NumberFormatException error = Assert.expectThrows(\n        NumberFormatException.class,\n        () -> Integer.parseInt(\"DEMO-14\")\n    );\n    Assert.assertTrue(error.getMessage().contains(\"DEMO-14\"));\n}",
      "language": "Java · snippet inside a TestNG class with required imports and test fixtures"
    },
    {
      "title": "Factories and scenario-specific instances",
      "intro": "A factory constructs test-class instances with different state. This is useful when several methods exercise the same immutable scenario description.",
      "points": [
        "Give each instance a small scenario object containing product, jurisdiction and expected coverage code.",
        "Keep mutable browser sessions and claim identifiers scoped to the invocation that owns them, especially when instances execute concurrently.",
        "Compare expected instance count with reported invocations. One construction error can remove an entire product from coverage."
      ],
      "q": "When would you use a factory for insurance test cases?",
      "a": "If several checks apply to each product configuration, I construct an instance per product. If only one method varies by amount, I use data rows. In both cases the report should identify the product and failing expectation.",
      "practice": "Design two product instances that share checks but have different expected coverage codes.",
      "source": [
        "TestNG · Factories and scenario-specific instances",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Factory.html"
      ]
    },
    {
      "title": "Data-provider row isolation",
      "intro": "A provider can supply concurrent scenario rows. Isolation covers both the Java object passed to a method and the server-side record it identifies.",
      "points": [
        "Give each row its own mutable collections where mutation is required. Sharing one map allows another test to rewrite expected values.",
        "Provision separate disposable claims for cases that modify state and collect created identifiers per invocation.",
        "Record the case key alongside expected and actual values so failures of the same method can be distinguished."
      ],
      "q": "Rows pass separately and fail together. What would you inspect?",
      "a": "I investigate shared objects, accounts and records, then reproduce two chosen rows concurrently. I compare values supplied at invocation with their later values. A separate browser offers little protection if both sessions modify the same claim.",
      "practice": "Create parallel rows for two limits and specify which resources they may safely share.",
      "source": [
        "TestNG · Data-provider row isolation",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/DataProvider.html"
      ]
    },
    {
      "title": "Lazy test-data iteration",
      "intro": "An iterator can supply a large data set progressively instead of allocating every argument row before test execution.",
      "points": [
        "Map input rows to named business cases and include the row identifier in conversion errors.",
        "Keep file and connection lifetimes compatible with iteration. Closing the source before returning an iterator can cause a mid-run failure.",
        "Compare the delivered inventory with the expected count. Early exhaustion can quietly omit the last several boundaries."
      ],
      "q": "How would you debug a provider that delivers only the first fifty rows?",
      "a": "I compare the source count with the reported invocations, inspect exhaustion and exceptions, and check whether the input closed too early. I reproduce with a small file whose final row contains a recognizable, unique case.",
      "practice": "Design a fixture with one malformed middle row and one valid final row. Specify the expected evidence.",
      "source": [
        "TestNG · Lazy test-data iteration",
        "https://testng.org/parameters.html"
      ]
    },
    {
      "title": "Method dependencies and skipped coverage",
      "intro": "A dependent method may be skipped when its prerequisite fails. A long dependency chain can leave many business rules untested.",
      "points": [
        "Use dependencies for a genuine sequencing requirement. Independent UI tests can create their own prerequisites through supported fixtures.",
        "When a prerequisite fails, inspect both the failure and downstream skips. The skipped methods provide no evidence about their business expectations.",
        "If a single journey needs several ordered actions, express that journey as one scenario with meaningful checkpoints."
      ],
      "q": "Why did a failed account test leave ten other checks skipped?",
      "a": "I examine the dependency graph, identify the first failed prerequisite and list the affected checks. For unrelated tests I replace ordering dependence with independent account setup. I report unexecuted coverage explicitly when discussing release risk.",
      "practice": "Draw a three-method chain and predict the outcomes if the middle method fails.",
      "source": [
        "TestNG · Method dependencies and skipped coverage",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Test.html"
      ]
    },
    {
      "title": "Priority and independent execution",
      "intro": "Method priority can influence scheduling. A test that relies on a preceding test to leave data behind becomes fragile when filtered or run alone.",
      "points": [
        "Execute the second method with a fresh environment. Missing setup reveals an implicit ordering dependency.",
        "For a multi-step policy journey, decide which actions form one business scenario and which deserve independent tests.",
        "Use explicit fixtures to construct prerequisite data and verify the scenario still works with different execution order."
      ],
      "q": "Is priority a good way to guarantee a claim exists before search?",
      "a": "I create a known searchable claim for the search test. I might use priority for scheduling preferences, but the method must run alone. I verify the exact claim identifier and clean up only records owned by that case.",
      "practice": "Refactor an ordered create-search-delete sequence into independently runnable checks.",
      "source": [
        "TestNG · Priority and independent execution",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Test.html"
      ]
    },
    {
      "title": "Disabled, excluded and skipped tests",
      "intro": "These outcomes have different implications for release coverage. A filtered method may never enter a run while a failed dependency can cause a recorded skip.",
      "points": [
        "Track each planned critical check by name, including temporarily disabled cases with an owner and review date.",
        "Use a runtime skip only for a documented applicability condition. An unexpected business failure needs a visible failure result.",
        "Compare the run inventory, skip reasons and configuration results alongside the pass percentage."
      ],
      "q": "How would you report a green suite with disabled payment coverage?",
      "a": "I state that the executed checks passed and that the payment check was absent. I identify why it was disabled, any alternative evidence and the person responsible for reinstatement. This distinguishes a successful run from proof of payment readiness.",
      "practice": "Classify a disabled method, an inapplicable policy type and a failed assertion.",
      "source": [
        "TestNG · Disabled, excluded and skipped tests",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Ignore.html"
      ]
    },
    {
      "title": "Time budgets and stalled tests",
      "intro": "A timeout sets an upper bound on execution. It does not explain which operation consumed the available time.",
      "points": [
        "Distinguish browser waits, network deadlines and the enclosing method budget in your diagnostics.",
        "Measure startup, data creation and assertion duration separately. This distinguishes slow setup from a slow business operation.",
        "After a timeout, verify cleanup and external state. A timed-out client operation may still complete on the server."
      ],
      "q": "A payment test times out after submission. Would you immediately repeat it?",
      "a": "I first check the payment reference, server state and last completed step. I use a fresh controlled record or a supported recovery path after understanding the original outcome. A second submission without this check might duplicate the payment.",
      "practice": "Build a time budget for setup, UI submission and verification of a claim change.",
      "source": [
        "TestNG · Time budgets and stalled tests",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Test.html"
      ]
    },
    {
      "title": "Repeated invocations and unique fixtures",
      "intro": "Repeated invocation can expose intermittent behavior when each attempt has a recognizable input, outcome and resource owner.",
      "points": [
        "Use invocationCount on a simple deterministic check and confirm the number of reported invocations.",
        "When investigating concurrency, verify the actual execution settings. Repetition alone does not demonstrate simultaneous requests.",
        "Choose unique keys for independent attempts and preserve every failure. A majority of passing attempts cannot establish reliability for a critical action."
      ],
      "q": "How would you use repeated invocations to investigate intermittent claim search?",
      "a": "I control search data, identify every attempt and retain evidence from the first unexpected result. I compare sequential and concurrent runs with the same input. I report the failure frequency together with the conditions under which it changes.",
      "practice": "Design five invocations reproducible from individual case identifiers.",
      "source": [
        "TestNG · Repeated invocations and unique fixtures",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/Test.html"
      ]
    },
    {
      "title": "Hard assertions and failure messages",
      "intro": "A hard assertion stops the current path on failure. A useful message connects the failed comparison to a specific business expectation.",
      "points": [
        "Choose an overload appropriate to the compared types and place actual and expected values in the documented order.",
        "Assert essential prerequisites before accessing dependent fields so a later null error does not hide a missing record.",
        "Include safe synthetic identifiers and relevant context such as policy term, amount and currency in the failure message."
      ],
      "q": "What would you assert after searching for policy DEMO-14?",
      "a": "I verify the query completed and the intended record exists. I compare its returned identifier with DEMO-14 and inspect the required term. A result count of one cannot distinguish the correct policy from a different matching record.",
      "practice": "Write a diagnostic message for an incorrect renewal effective date.",
      "source": [
        "TestNG · Hard assertions and failure messages",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/Assert.html"
      ],
      "code": "Assert.assertEquals(actualPolicyNumber, expectedPolicyNumber,\n    \"Search returned the wrong policy\");",
      "language": "Java · snippet inside a TestNG class with required imports and test fixtures"
    },
    {
      "title": "Soft assertions for independent comparisons",
      "intro": "A SoftAssert collects failed comparisons and reports them together when assertAll is called. The collected observations should remain independently meaningful.",
      "points": [
        "Compare invoice due date, currency and displayed balance after establishing that the intended invoice exists.",
        "Create a SoftAssert for each test invocation. Sharing one can mix failures from distinct data rows or worker threads.",
        "Call assertAll before completion and include business-specific messages for each comparison."
      ],
      "q": "When would you combine hard and soft assertions?",
      "a": "I use a hard check to establish that the response describes the intended invoice. Then I collect independent field mismatches with soft comparisons. If the invoice identity is wrong, the later comparisons describe the wrong object and add little diagnostic value.",
      "practice": "Split five invoice assertions into essential prerequisites and independent field checks.",
      "source": [
        "TestNG · Soft assertions for independent comparisons",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/asserts/SoftAssert.html"
      ],
      "code": "SoftAssert checks = new SoftAssert();\nchecks.assertEquals(invoice.getCurrency(), \"USD\", \"Invoice currency\");\nchecks.assertEquals(invoice.getDueDate(), expectedDueDate, \"Due date\");\nchecks.assertAll();",
      "language": "Java · snippet inside a TestNG class with required imports and test fixtures"
    },
    {
      "title": "Teardown after partial setup",
      "intro": "A test can fail before every resource has been allocated. Teardown should release resources actually owned by that invocation.",
      "points": [
        "Choose a teardown scope matching the owner and use alwaysRun where cleanup must be attempted after earlier failures.",
        "Record created resources as soon as initialization succeeds. Cleanup may need to release a record even when later browser startup fails.",
        "Make cleanup tolerate absent resources and preserve the original exception alongside any teardown error."
      ],
      "q": "How would you handle setup failing halfway through a browser fixture?",
      "a": "I track which resources actually exist, close those resources in the matching teardown and preserve the setup exception in the report. I deliberately induce the failure and verify that neither an abandoned session nor a leftover test record remains.",
      "practice": "Design a setup failure immediately after claim creation and before browser initialization.",
      "source": [
        "TestNG · Teardown after partial setup",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/annotations/AfterMethod.html"
      ]
    },
    {
      "title": "Test context and run metadata",
      "intro": "ITestContext exposes information about a particular XML test run. Its usefulness depends on matching the data lifetime to that scope.",
      "points": [
        "Use context for stable run information such as an environment label that is shared by the intended tests.",
        "Avoid storing one changing claim identifier under a common key when invocations can execute concurrently.",
        "Name context attributes deliberately and validate their presence at consumption. An absent attribute should produce an understandable setup error."
      ],
      "q": "What is the risk of keeping currentClaimId in a shared context?",
      "a": "Another invocation may overwrite the value before the first test reads it. I keep per-invocation identifiers with their test data and use context for stable metadata. I reproduce the race by running two cases with distinguishable claim IDs.",
      "practice": "Classify an environment URL, a run identifier and a new claim identifier by appropriate owner.",
      "source": [
        "TestNG · Test context and run metadata",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/ITestContext.html"
      ]
    },
    {
      "title": "Invocation results and failure evidence",
      "intro": "ITestResult describes an individual result and provides information a listener can use for targeted diagnostics.",
      "points": [
        "Use method, parameters and throwable to identify the failed invocation. Redact confidential fields before including data in artifacts.",
        "Generate screenshot names that distinguish repeated rows and retries. A shared filename can overwrite an earlier failure.",
        "Capture evidence before releasing the browser when feasible, and record failures in evidence collection separately."
      ],
      "q": "How would you avoid attaching the wrong screenshot to a data-driven test?",
      "a": "I correlate the result with that invocation’s driver, unique case key and attempt number. I capture the evidence before browser teardown and verify its filename cannot collide. A shared global driver could capture the page of another concurrently running test.",
      "practice": "Design an artifact name for two browsers running the same payment scenario.",
      "source": [
        "TestNG · Invocation results and failure evidence",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/ITestResult.html"
      ]
    },
    {
      "title": "Listener registration and observation",
      "intro": "A TestNG listener can observe test outcomes across a suite and apply a common diagnostic policy.",
      "points": [
        "Choose the interface whose lifecycle event matches the evidence needed and register it through a supported runner mechanism.",
        "Verify registration using a small deliberate failure. A missing registration may leave tests passing while silently omitting expected artifacts.",
        "Keep callbacks suitable for concurrent execution. A listener collecting a screenshot should not change the tested business state."
      ],
      "q": "How would you diagnose a failure listener that never creates artifacts?",
      "a": "I confirm registration and callback execution first, then check driver availability, output location and filesystem access. I use one intentional failure in a small suite so I can observe the evidence path independently from unrelated test cases.",
      "practice": "List three observations that distinguish missing registration from a failed screenshot write.",
      "source": [
        "TestNG · Listener registration and observation",
        "https://testng.org/testng_listeners.html"
      ]
    },
    {
      "title": "Configuration failures and affected tests",
      "intro": "A configuration error can prevent many methods from reaching their test bodies. The initiating fault and the lost coverage need separate evidence.",
      "points": [
        "Separate setup and teardown failures from ordinary test assertion failures in the report.",
        "After a before-class hook fails, identify which methods could not execute and which unaffected classes completed.",
        "Capture the earliest useful exception and the environment involved. Downstream skip messages rarely explain why initialization failed."
      ],
      "q": "Twenty tests were skipped after one setup error. How would you investigate?",
      "a": "I inspect the configuration failure first and identify the methods it prevented from running. I reproduce that setup before drawing conclusions about those business behaviors. In the release summary I report the blocked scope and any independent checks that still passed.",
      "practice": "Write a release note for an unavailable database that blocked claim regression setup.",
      "source": [
        "TestNG · Configuration failures and affected tests",
        "https://testng.org/method_invocations.html"
      ]
    },
    {
      "title": "Invocation listeners and timing",
      "intro": "An invocation listener observes method execution and helps measure configuration overhead separately from business-test duration.",
      "points": [
        "Identify whether a callback relates to a configuration method or a test method before assigning the measurement to a category.",
        "Use a timing record for each invocation so worker threads can finish in a different order from their start order.",
        "Report slow setup, action and teardown separately. Combining them can point the team toward the wrong optimization."
      ],
      "q": "How would you discover whether a suite is slow because of browser startup?",
      "a": "I measure setup invocations and test methods separately and compare timing distributions across workers. I compare startup with scenario execution. A single shared start timestamp would produce misleading durations when several workers are active simultaneously.",
      "practice": "Sketch timing evidence for two overlapping test setups.",
      "source": [
        "TestNG · Invocation listeners and timing",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/IInvokedMethodListener.html"
      ]
    },
    {
      "title": "Retry analyzers and repeat-safe operations",
      "intro": "A retry analyzer decides whether a failed invocation is eligible for another attempt. The decision needs a bound and a clear reason.",
      "points": [
        "Restrict retries to a known transient condition and retain the original exception and attempt number.",
        "Check whether the earlier attempt mutated the application. A repeated payment submission requires a known outcome or appropriate duplicate prevention.",
        "Keep retry accounting separate per case under parallel execution and retain all attempts in the report."
      ],
      "q": "What would make an automatic retry unsafe?",
      "a": "The earlier attempt may already have committed a financial transaction. I inspect the payment reference and recovery semantics before allowing repetition. I require the scenario to be safe to repeat and keep the initial failure visible for investigation.",
      "practice": "Compare a connection failure before login with a timeout after payment submission for retry eligibility.",
      "source": [
        "TestNG · Retry analyzers and repeat-safe operations",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/IRetryAnalyzer.html"
      ]
    },
    {
      "title": "Failed-suite reproduction",
      "intro": "The generated failed-suite file helps reproduce failed methods without starting the whole original suite again.",
      "points": [
        "Save the original suite configuration, first report and generated failed-suite file together so the reproduction context is clear.",
        "Check for changed external data or missing prerequisites when a previously failing method passes in isolation.",
        "Keep rerun results separate from the original outcome. A passing rerun can reveal an order-dependent defect."
      ],
      "q": "Why might a failed-suite rerun pass despite a real problem?",
      "a": "The smaller run may remove ordering pressure, concurrent writes or environmental contention. I compare test data, execution order and timing and create a controlled reproduction of the suspected dependency. I preserve the original result until the cause is explained.",
      "practice": "Design a reproduction for a search test that fails only after another case modifies its claim.",
      "source": [
        "TestNG · Failed-suite reproduction",
        "https://testng.org/rerunning_failed_tests.html"
      ]
    },
    {
      "title": "Annotation transformers and runtime selection",
      "intro": "An annotation transformer changes supported annotation settings as TestNG reads them. The resulting test inventory should be visible and reviewable.",
      "points": [
        "Use a transformer for a specific documented policy and verify its impact on the intended test group.",
        "Register it using a supported early mechanism. TestNG documents that registration through the Listeners annotation is unsuitable for a transformer.",
        "Record the effective policy and discovered methods so unintended disabling cannot masquerade as successful execution."
      ],
      "q": "How would you verify that a transformer disabled only the intended tests?",
      "a": "I run a small suite with one targeted case and one unaffected control under both policy settings. I compare the discovered and executed inventory and inspect the logged selection decision. I review policy changes together with their coverage implications.",
      "practice": "Create a two-case check for a runtime selection rule.",
      "source": [
        "TestNG · Annotation transformers and runtime selection",
        "https://testng.org/annotation_transformers.html"
      ]
    },
    {
      "title": "Method interceptors and ordering",
      "intro": "A method interceptor can influence eligible independent methods after TestNG calculates ordering information.",
      "points": [
        "Use interception only for a documented filtering or scheduling requirement and identify its affected method set.",
        "Keep dependent method ordering under the dependency model. An interceptor does not establish missing prerequisite data.",
        "Compare expected and observed invocations, including the filter reason, so a subset is not mistaken for full regression."
      ],
      "q": "How would you test an interceptor prioritizing quick checks?",
      "a": "I assign controlled categories, execute a small suite and inspect both order and inventory. I include a dependent pair as a control. I verify that the quick independent checks move as intended and that every required scenario still executes.",
      "practice": "Construct a four-method suite with two independent and two dependent checks.",
      "source": [
        "TestNG · Method interceptors and ordering",
        "https://testng.org/method_interceptors.html"
      ]
    },
    {
      "title": "Custom reporters and result reconciliation",
      "intro": "An IReporter can summarize completed suite results for readers who need a cross-suite view.",
      "points": [
        "Group outcomes by useful dimensions such as product, browser and risk area, while retaining links to invocation evidence.",
        "Count configuration failures, skipped checks and retries consistently. Reconcile category counts with the actual test inventory.",
        "Expose report-generation problems so an absent report cannot be mistaken for an empty successful suite."
      ],
      "q": "What should a release report show besides pass percentage?",
      "a": "I include planned and executed scope, critical failures, blocked coverage and environment information. I reconcile counts with the source results and link known defects to evidence. A high pass percentage can still include a failure in the payment release gate.",
      "practice": "Design a summary for fifty cases including two blocked checks and one failed critical test.",
      "source": [
        "TestNG · Custom reporters and result reconciliation",
        "https://javadoc.io/static/org.testng/testng/7.11.0/org/testng/IReporter.html"
      ]
    },
    {
      "title": "Maven Surefire and test discovery",
      "intro": "Maven adds its own discovery and configuration layer around TestNG. Tests visible in an IDE can be missing from a build.",
      "points": [
        "Inspect the TestNG dependency, Surefire configuration, naming patterns and any selected XML suites in the actual project.",
        "Check command-line filters and CI profiles before debugging the body of a test that never appeared in a report.",
        "Compare reports with the expected smoke inventory after changes to packages, build profiles or file names."
      ],
      "q": "How do you investigate a Maven build that passes without running a new test?",
      "a": "I inspect effective build configuration, includes, excludes and suite selection. I reproduce the CI command and check that a uniquely identifiable test appears in the resulting inventory. I also verify report timestamps to rule out an older run.",
      "practice": "Describe two ways a green build could omit a new claim-payments test.",
      "source": [
        "Apache Maven · TestNG and Surefire",
        "https://maven.apache.org/surefire/maven-surefire-plugin/examples/testng.html"
      ]
    },
    {
      "title": "Gradle Test tasks and framework selection",
      "intro": "A Gradle Test task selects the framework, source set and execution filters used for a run.",
      "points": [
        "Configure the intended task to use TestNG and ensure the required runtime dependencies are available.",
        "Where smoke and regression tasks are separate, verify their inputs and filters independently.",
        "Inspect task output and generated results for selected cases. An up-to-date task may explain why no fresh execution occurred."
      ],
      "q": "How would you prove that a Gradle smoke task ran the right suite?",
      "a": "I inspect the task configuration and selected framework, run the documented command and compare method names with the smoke inventory. I check task status and artifact location so I do not accidentally cite a report from an earlier execution.",
      "practice": "Map a smoke task and a regression task to expected classes and grouped coverage.",
      "source": [
        "Gradle · Java testing",
        "https://docs.gradle.org/current/userguide/java_testing.html"
      ]
    }
  ],
  "java": [
    {
      "title": "Comparing optional text fields",
      "intro": "A claim export can contain missing values. Define equality before comparing the API field with the exported field.",
      "points": [
        "Use Objects.equals when either reference can be null. Two null references then compare equal.",
        "Decide separately whether a missing value is allowed. A nullable equality check alone would let two missing mandatory fields pass.",
        "Preserve meaningful differences such as an empty string versus null. Normalize case or whitespace only when the requirement calls for it."
      ],
      "q": "If both claim references are missing, should the comparison pass?",
      "a": "I would separate presence from equality. For a required claim reference I would first require a nonblank value on each side, then compare them. For an optional reference I would follow the agreed null and empty-string rules.",
      "practice": "Predict the results for two nulls, null and an empty string, and two distinct strings containing the same claim number.",
      "source": [
        "Oracle Java API · Objects",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Objects.html"
      ],
      "language": "Java 11+ · save as Example01.java and run java Example01.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example01 {\n  public static void main(String[] args) throws Exception {\n    String fromApi = null;\n    String fromExport = \"\";\n    System.out.println(Objects.equals(fromApi, fromExport));\n  }\n}"
    },
    {
      "title": "Identifiers and leading zeros",
      "intro": "Some values consist entirely of digits but act as identifiers. The leading zeros on a policy reference can carry meaning.",
      "points": [
        "Keep the original text when comparing identifiers. Converting both sides to integers would make 0007 and 7 look identical.",
        "Check permitted characters and length as separate requirements before asserting equality. A matching length alone says nothing about the characters.",
        "Use synthetic identifiers in examples and evidence. Include a value starting with zero to expose accidental numeric conversion."
      ],
      "q": "Why might parsing policy numbers hide a defect?",
      "a": "Parsing can discard formatting the contract requires. I would keep identifiers as strings and compare the exact value, including leading zeros. If a system intentionally reformats identifiers, I would assert its documented mapping with examples on both sides.",
      "practice": "Write a test where the numeric values match but a four-character reference has been corrupted.",
      "source": [
        "Oracle Java API · String",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      ],
      "language": "Java 11+ · save as Example02.java and run java Example02.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example02 {\n  public static void main(String[] args) throws Exception {\n    String expected = \"0007\", actual = \"7\";\n    System.out.println(expected.equals(actual));\n  }\n}"
    },
    {
      "title": "Parsing quantities at the integer boundary",
      "intro": "A quantity field needs both a syntax rule and a permitted numeric range. Converting the text is only one part of validation.",
      "points": [
        "Integer.parseInt accepts a signed decimal representation within the int range. Larger inputs can raise NumberFormatException even when every character is a digit.",
        "Check the application’s range after parsing. A negative number might parse successfully while remaining invalid for a quantity.",
        "Test blank input, leading whitespace, the maximum accepted business quantity and a value outside the integer range. Record which validation failed."
      ],
      "q": "Would digits-only validation prevent an integer overflow during parsing?",
      "a": "No. The number might contain only digits and still exceed the type’s range. I would handle the parse error separately from a business-limit violation so the test identifies the actual failure.",
      "practice": "Try 2147483647 and 2147483648. Explain which input reaches the business-rule check.",
      "source": [
        "Oracle Java API · Integer",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html"
      ],
      "language": "Java 11+ · save as Example03.java and run java Example03.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example03 {\n  public static void main(String[] args) throws Exception {\n    try {\n      Integer.parseInt(\"2147483648\");\n      System.out.println(\"accepted\");\n    } catch (NumberFormatException e) {\n      System.out.println(\"outside int range\");\n    }\n  }\n}"
    },
    {
      "title": "Comparing decimal amounts with different scales",
      "intro": "An API may return 12.0 while an invoice displays 12.00. Choose a comparison that matches what the requirement actually specifies.",
      "points": [
        "Construct BigDecimal from the supplied decimal string so the test uses the exact decimal representation.",
        "compareTo checks numeric ordering and returns zero for equal numerical values. equals also considers scale, which can matter in representation tests.",
        "Check the currency separately and verify display precision independently. Equal numeric values do not establish that the invoice formatting is correct."
      ],
      "q": "Why can BigDecimal equality fail for two equal monetary values?",
      "a": "The representations can have different scales. I would assert numeric value with compareTo for a financial reconciliation, then check scale or formatted text separately if the display or interface contract requires two decimal places.",
      "practice": "Write independent checks for numeric equality, expected currency and the displayed two-decimal format.",
      "source": [
        "Oracle Java API · BigDecimal",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html"
      ],
      "language": "Java 11+ · save as Example04.java and run java Example04.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example04 {\n  public static void main(String[] args) throws Exception {\n    BigDecimal a = new BigDecimal(\"12.0\");\n    BigDecimal b = new BigDecimal(\"12.00\");\n    System.out.println(a.compareTo(b) == 0);\n    System.out.println(a.equals(b));\n  }\n}"
    },
    {
      "title": "Rounding an installment at the right stage",
      "intro": "Rounding each installment can produce a different total from rounding once at the end of the schedule.",
      "points": [
        "Write down the approved rounding mode, scale and rounding stage before calculating the expected values in your test.",
        "For an example split of 10.00 across three installments, three equal rounded amounts of 3.33 add up to 9.99.",
        "If the example rule assigns the remainder to the last installment, calculate that final item from the original total and the first two items."
      ],
      "q": "How would you detect a one-cent discrepancy in a schedule?",
      "a": "I would verify both the individual expected items and their total. For a remainder-to-last rule, the last amount would be 3.34. I would also test negative adjustments and a different rounding rule using independently approved expectations.",
      "practice": "Repeat the example for 10.01 and explain where the extra cent belongs under the given rule.",
      "source": [
        "Oracle Java API · RoundingMode",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/RoundingMode.html"
      ],
      "language": "Java 11+ · save as Example05.java and run java Example05.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example05 {\n  public static void main(String[] args) throws Exception {\n    BigDecimal total = new BigDecimal(\"10.00\");\n    BigDecimal part = total.divide(BigDecimal.valueOf(3), 2, RoundingMode.HALF_UP);\n    System.out.println(total.subtract(part.multiply(BigDecimal.valueOf(2))));\n  }\n}"
    },
    {
      "title": "Parsing valid calendar dates",
      "intro": "A loss date can match the expected string pattern while representing an impossible day on the calendar.",
      "points": [
        "Parse an ISO date with LocalDate.parse so the check validates an actual year, month and day.",
        "Keep invalid-text cases separate from valid dates that violate an insurance rule, such as a loss outside a policy term.",
        "Use examples near leap days and month ends. Confirm the parsed value reaches the intended downstream validation."
      ],
      "q": "Is a regular expression sufficient to validate a loss date?",
      "a": "A format check can reject bad punctuation, but it cannot by itself establish that a calendar date exists. I would parse the date first, then apply business checks such as the permitted reporting period.",
      "practice": "Compare the expected outcomes for February 29 in 2024 and 2025.",
      "source": [
        "Oracle Java API · LocalDate",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html"
      ],
      "language": "Java 11+ · save as Example06.java and run java Example06.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example06 {\n  public static void main(String[] args) throws Exception {\n    for (String text : List.of(\"2024-02-29\", \"2025-02-29\")) {\n      try { System.out.println(LocalDate.parse(text)); }\n      catch (java.time.format.DateTimeParseException error) { System.out.println(\"invalid date\"); }\n    }\n  }\n}"
    },
    {
      "title": "Testing an effective-date interval",
      "intro": "Representing a policy term as a half-open interval makes the treatment of the final day explicit in the test.",
      "points": [
        "In this exercise the start date is included and the end date is excluded. Use the actual contract before applying this illustration to a project.",
        "Express the condition as on or after start and strictly before end. This avoids subtracting one day from every stored end date.",
        "Check dates immediately before start, exactly at start, just before end and exactly at end, including a transition into the next term."
      ],
      "q": "How would you catch an off-by-one error at renewal?",
      "a": "I would compare the last date inside the old interval with the first date in the new interval. I would verify which term is selected on each day and that neither overlap nor a gap is introduced by the boundary logic.",
      "practice": "Add a case on the end date to the example, then explain why the expected result changes.",
      "source": [
        "Oracle Java API · LocalDate",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html"
      ],
      "language": "Java 11+ · save as Example07.java and run java Example07.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example07 {\n  public static void main(String[] args) throws Exception {\n    LocalDate start = LocalDate.parse(\"2025-01-01\");\n    LocalDate end = LocalDate.parse(\"2026-01-01\");\n    LocalDate loss = end.minusDays(1);\n    System.out.println(!loss.isBefore(start) && loss.isBefore(end));\n  }\n}"
    },
    {
      "title": "Comparing timestamps across offsets",
      "intro": "A source system and a downstream event log may describe the same instant with different local clock readings.",
      "points": [
        "Parse the supplied offsets, then compare the resulting instants when the requirement concerns event ordering or elapsed time.",
        "Keep local business dates separate from instants. The date used for billing may depend on a named business time zone.",
        "Check what happens around midnight and when precision differs between systems. Truncate precision only if the contract explicitly permits it."
      ],
      "q": "Can two different timestamp strings represent the same event time?",
      "a": "Yes. I would parse each offset-aware value and compare its instant. I would separately verify that the expected offset, local date and precision are preserved when those are also part of the contract.",
      "practice": "Change one timestamp by one minute and confirm that the instant comparison detects it.",
      "source": [
        "Oracle Java API · OffsetDateTime",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/OffsetDateTime.html"
      ],
      "language": "Java 11+ · save as Example08.java and run java Example08.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example08 {\n  public static void main(String[] args) throws Exception {\n    OffsetDateTime india = OffsetDateTime.parse(\"2025-06-01T10:00:00+05:30\");\n    OffsetDateTime utc = OffsetDateTime.parse(\"2025-06-01T04:30:00Z\");\n    System.out.println(india.toInstant().equals(utc.toInstant()));\n  }\n}"
    },
    {
      "title": "Comparing array contents",
      "intro": "Java arrays use reference identity for their ordinary equals method. A QA utility should express whether element content and order matter.",
      "points": [
        "Build the expected values independently so your expected array does not reference the same mutable object as the actual result.",
        "Use Arrays.equals for a one-dimensional primitive array when element order matters. For nested arrays, confirm the required comparison depth.",
        "Include repeated values and a permutation of the same values. The test should fail on a permutation when ordering is contractual."
      ],
      "q": "Why did a comparison of identical-looking arrays fail?",
      "a": "I would check whether the code compared array references. For ordered primitive values I would compare contents with Arrays.equals. I would inspect length and individual elements to give a useful failure report.",
      "practice": "Compare {1,2,2} with {2,1,2} under both an ordered-list contract and an unordered contract.",
      "source": [
        "Oracle Java API · Arrays",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html"
      ],
      "language": "Java 11+ · save as Example09.java and run java Example09.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example09 {\n  public static void main(String[] args) throws Exception {\n    int[] expected = {1, 2, 2};\n    int[] observed = {1, 2, 2};\n    System.out.println(Arrays.equals(expected, observed));\n  }\n}"
    },
    {
      "title": "Taking a snapshot before a mutation",
      "intro": "A before-and-after test can pass incorrectly when both variables point to the same mutable collection.",
      "points": [
        "Assigning a list variable to another name keeps the same list object. Later changes can silently change the apparent baseline.",
        "For immutable elements such as String, copying the list structure is enough for this example. Mutable elements may also need independent snapshots.",
        "Check that the baseline remains unchanged after mutation and that your assertion detects the one expected addition."
      ],
      "q": "Why would a before-and-after comparison always show identical values?",
      "a": "I would look for aliasing between expected and actual objects. I would capture an independent snapshot before the action, at the depth appropriate for the data, and compare the resulting values with that stable baseline.",
      "practice": "Change the example to assign before = current and predict what the baseline will contain.",
      "source": [
        "Oracle Java API · ArrayList",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html"
      ],
      "language": "Java 11+ · save as Example10.java and run java Example10.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example10 {\n  public static void main(String[] args) throws Exception {\n    List<String> current = new ArrayList<>(List.of(\"open\"));\n    List<String> before = new ArrayList<>(current);\n    current.add(\"paid\");\n    System.out.println(before);\n  }\n}"
    },
    {
      "title": "Comparing lists when duplicate counts matter",
      "intro": "A reconciliation can require matching both values and their number of occurrences while allowing a different order.",
      "points": [
        "A set comparison drops duplicate counts. Two identical sets can hide a missing second posting or an extra duplicate record.",
        "For sortable immutable values, sort copies and compare the resulting lists. Copy first to avoid changing source order used by another check.",
        "Run an example where both sides contain the same distinct IDs but one side repeats a different ID. The comparison should fail."
      ],
      "q": "How would you compare unordered exports that can contain repeated IDs?",
      "a": "I would compare a frequency map or sorted copies, preserving the number of each ID. I would agree on case and null handling before comparing and report the exact missing or extra occurrences.",
      "practice": "Create an example where comparing sets passes incorrectly but the sorted-list comparison detects a mismatch.",
      "source": [
        "Oracle Java API · Collections",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html"
      ],
      "language": "Java 11+ · save as Example11.java and run java Example11.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example11 {\n  public static void main(String[] args) throws Exception {\n    List<String> a = new ArrayList<>(List.of(\"A\",\"A\",\"B\"));\n    List<String> b = new ArrayList<>(List.of(\"B\",\"B\",\"A\"));\n    Collections.sort(a); Collections.sort(b);\n    System.out.println(a.equals(b));\n  }\n}"
    },
    {
      "title": "Preserving encounter order during deduplication",
      "intro": "A report may need the first occurrence of each claim number in input order.",
      "points": [
        "Use an ordered set when the requirement is uniqueness with first-seen order. Decide whether case and surrounding whitespace are significant.",
        "Compare the ordered output with the expected sequence, not only its size. The same number of distinct items can appear in the wrong order.",
        "If duplicates are themselves defects, record them before deduplicating. Otherwise the normalization step can conceal a real source problem."
      ],
      "q": "How would you return the first occurrence of each claim number?",
      "a": "I would traverse the input once and add IDs to a LinkedHashSet. Iterating that set gives first-seen order. I would test repeated adjacent values, nonadjacent repeats and an empty input.",
      "practice": "Predict the output for B,A,B,C,A, then explain whether a plain HashSet guarantees that order.",
      "source": [
        "Oracle Java API · LinkedHashSet",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashSet.html"
      ],
      "language": "Java 11+ · save as Example12.java and run java Example12.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example12 {\n  public static void main(String[] args) throws Exception {\n    List<String> ids = List.of(\"B\",\"A\",\"B\",\"C\",\"A\");\n    System.out.println(new LinkedHashSet<>(ids));\n  }\n}"
    },
    {
      "title": "Counting events by business key",
      "intro": "A frequency map makes it possible to compare how many payment events each business reference received.",
      "points": [
        "Start with an empty map keyed by the reference. Increment the count once for each event consumed by the test.",
        "Use merge to initialize a missing key to one or add one to the existing count. Choose a predictable iteration order when printing evidence.",
        "A count above one is a finding to investigate. Some business references can legitimately appear multiple times, so establish the expected grain first."
      ],
      "q": "How would you expose repeated notifications in test evidence?",
      "a": "I would count events by their agreed deduplication key and compare counts with the contract. I would retain sample event identifiers and timestamps so the team can distinguish legitimate updates from repeated delivery.",
      "practice": "Modify the input so one reference occurs three times, then identify the key and its exact count.",
      "source": [
        "Oracle Java API · Map",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html"
      ],
      "language": "Java 11+ · save as Example13.java and run java Example13.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example13 {\n  public static void main(String[] args) throws Exception {\n    Map<String,Integer> counts = new LinkedHashMap<>();\n    for (String id : List.of(\"P1\",\"P2\",\"P1\")) counts.merge(id, 1, Integer::sum);\n    System.out.println(counts);\n  }\n}"
    },
    {
      "title": "Finding the first unique character",
      "intro": "An interview exercise asking for the first non-repeating character requires both frequency information and input order.",
      "points": [
        "For this ASCII exercise, count characters in a first pass and scan the input again to find the first count equal to one.",
        "Clarify whether letter case is significant and what to return when no unique character exists. Use the agreed contract for whitespace.",
        "A Java char is a UTF-16 code unit. For full Unicode support, discuss code points or user-perceived characters before extending the algorithm."
      ],
      "q": "Why use two passes for the first unique character?",
      "a": "The first pass tells me which characters repeat. The second preserves input order so I return the first unique character rather than whichever key a hash map happens to iterate first. I would include empty input and a no-match example.",
      "practice": "Run the algorithm on CLAIM and LEVEL, then explain the expected result when every character repeats.",
      "source": [
        "Oracle Java API · String",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      ],
      "language": "Java 11+ · save as Example14.java and run java Example14.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example14 {\n  public static void main(String[] args) throws Exception {\n    String input = \"LEVEL\";\n    Map<Character,Integer> counts = new HashMap<>();\n    for (char c : input.toCharArray()) counts.merge(c, 1, Integer::sum);\n    for (char c : input.toCharArray()) if (counts.get(c) == 1) { System.out.println(c); break; }\n  }\n}"
    },
    {
      "title": "Finding missing reconciliation keys",
      "intro": "A total row count cannot identify which specific claim disappeared during a data load.",
      "points": [
        "Create expected and actual key sets only after agreeing that each key should occur once. Validate duplicates separately before converting rows to sets.",
        "Compute expected minus actual for missing records and actual minus expected for unexpected records. These comparisons answer different questions.",
        "Use a stable iteration order in failure output so the investigator can reproduce the report and locate the first affected key."
      ],
      "q": "Why do both set differences matter in ETL testing?",
      "a": "A missing expected key can be replaced by an unexpected one while row counts stay equal. I would report the two differences separately and compare important field values for keys present in both datasets.",
      "practice": "Use expected A,B,C and actual A,C,D. Identify the missing and unexpected keys.",
      "source": [
        "Oracle Java API · Set",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html"
      ],
      "language": "Java 11+ · save as Example15.java and run java Example15.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example15 {\n  public static void main(String[] args) throws Exception {\n    Set<String> expected = new TreeSet<>(List.of(\"A\",\"B\",\"C\"));\n    Set<String> actual = new TreeSet<>(List.of(\"A\",\"C\",\"D\"));\n    Set<String> missing = new TreeSet<>(expected); missing.removeAll(actual);\n    Set<String> extra = new TreeSet<>(actual); extra.removeAll(expected);\n    System.out.println(missing + \" / \" + extra);\n  }\n}"
    },
    {
      "title": "Sorting numeric values stored as text",
      "intro": "A table of item quantities may arrive as strings even though the business requirement specifies numeric ordering.",
      "points": [
        "Lexicographic order places 10 before 2. Define whether the displayed values represent actual quantities or identifiers with textual ordering.",
        "For known valid integer quantities, use a comparator that parses each value and compares numerically. Test negative values and duplicate numbers.",
        "Define behavior for invalid or missing quantities separately. Parsing inside a comparator should not silently convert bad data into zero."
      ],
      "q": "What input would expose an accidental text sort in a UI table?",
      "a": "I would use values such as 2,10 and 3. I would derive the expected numeric order independently, check the displayed sequence and repeat for descending order. I would include distinct values that have the same numeric representation if formatting matters.",
      "practice": "Add 02 to the input and specify a tie-breaking rule if the display order must be deterministic.",
      "source": [
        "Oracle Java API · Comparator",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html"
      ],
      "language": "Java 11+ · save as Example16.java and run java Example16.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example16 {\n  public static void main(String[] args) throws Exception {\n    List<String> values = new ArrayList<>(List.of(\"10\",\"2\",\"3\"));\n    values.sort(Comparator.comparingInt(Integer::parseInt));\n    System.out.println(values);\n  }\n}"
    },
    {
      "title": "Defining a tie-breaker for equal sort keys",
      "intro": "Pagination tests are easier to interpret when rows with equal primary values have a documented secondary order.",
      "points": [
        "This exercise sorts codes first by length and then alphabetically. The second condition resolves ties in the primary sort key.",
        "Use comparator composition to express both rules. Avoid using subtraction to compare arbitrary integer keys because it can overflow.",
        "Compare the complete sequence across page boundaries using records with equal primary keys. Confirm which parts of the ordering the application actually guarantees."
      ],
      "q": "How would you test a stable secondary order in a sorted result?",
      "a": "I would create several records sharing the primary sort value and assign distinguishable secondary keys. I would verify the expected sequence and look for missing or repeated records across pages. I would avoid requiring a secondary order unless the contract defines one.",
      "practice": "Write the expected order of PC,BC,A and CC under a length-then-alphabetical rule.",
      "source": [
        "Oracle Java API · Comparator",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html"
      ],
      "language": "Java 11+ · save as Example17.java and run java Example17.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example17 {\n  public static void main(String[] args) throws Exception {\n    List<String> codes = new ArrayList<>(List.of(\"PC\",\"BC\",\"A\",\"CC\"));\n    codes.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));\n    System.out.println(codes);\n  }\n}"
    },
    {
      "title": "Distinguishing an absent field from a null field",
      "intro": "An API contract can distinguish a property omitted from a response from a property explicitly set to null.",
      "points": [
        "Read both the key’s presence and its value when testing this distinction. Map.get alone can return null in both cases.",
        "Choose a map that permits null values for the example. Factories such as Map.of reject null keys and values.",
        "Test omitted, explicitly null and populated values as separate inputs. Decide which responses are permitted by the endpoint contract."
      ],
      "q": "Why would a null check alone miss a response-contract regression?",
      "a": "The producer might have removed a required field while the test sees the same null result as before. I would check key presence first and then check the value or allowed nullability.",
      "practice": "Add a required-but-null field and an omitted optional field to a response fixture. Write the expected assertion for each.",
      "source": [
        "Oracle Java API · HashMap",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html"
      ],
      "language": "Java 11+ · save as Example18.java and run java Example18.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example18 {\n  public static void main(String[] args) throws Exception {\n    Map<String,String> fields = new HashMap<>();\n    fields.put(\"adjuster\", null);\n    System.out.println(fields.containsKey(\"adjuster\"));\n    System.out.println(fields.containsKey(\"reviewer\"));\n  }\n}"
    },
    {
      "title": "Checking adjacent workflow transitions",
      "intro": "A final status can be valid even when the path used to reach it contained an invalid transition.",
      "points": [
        "Define the permitted adjacent state pairs for a small fictional workflow. Check every neighboring pair in the actual event sequence.",
        "Start at index one so each state has a predecessor. Include empty and one-element histories and decide what they should mean.",
        "Capture the first invalid pair and its position in test evidence. Validate allowed initial and terminal states separately when required."
      ],
      "q": "How would you detect an invalid intermediate claim state?",
      "a": "I would compare each adjacent pair against the configured transition rules. For this exercise, draft to paid is invalid because it skips review. I would report that pair even if a later status looks correct.",
      "practice": "Add an extra repeated state and decide whether a self-transition is permitted in the example workflow.",
      "source": [
        "Oracle Java API · List",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html"
      ],
      "language": "Java 11+ · save as Example19.java and run java Example19.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example19 {\n  public static void main(String[] args) throws Exception {\n    Set<String> allowed = Set.of(\"draft>review\",\"review>paid\");\n    List<String> path = List.of(\"draft\",\"paid\");\n    for (int i=1; i<path.size(); i++) {\n      String edge = path.get(i-1) + \">\" + path.get(i);\n      if (!allowed.contains(edge)) System.out.println(edge);\n    }\n  }\n}"
    },
    {
      "title": "Validating a complete identifier with a regex",
      "intro": "Looking for a valid-looking fragment inside an identifier can accept input with unintended text at either end.",
      "points": [
        "Define the exact required format before writing the expression. Here the whole value must be CL- followed by exactly three ASCII digits.",
        "Use matches for a whole-input check and find when searching within surrounding text. Choose deliberately between these two operations.",
        "Include valid values embedded inside a longer string, empty input and too many digits. Handle null before invoking a matcher."
      ],
      "q": "Why can a pattern be correct but its test still accept a malformed claim ID?",
      "a": "The test may search for a matching fragment instead of validating the complete input. I would choose the matcher operation based on the contract and add negative cases that contain a valid substring within an invalid value.",
      "practice": "Compare matches and find for xCL-123y and CL-123. Explain which operation an identifier validator should use.",
      "source": [
        "Oracle Java API · Matcher",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Matcher.html"
      ],
      "language": "Java 11+ · save as Example20.java and run java Example20.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example20 {\n  public static void main(String[] args) throws Exception {\n    Pattern id = Pattern.compile(\"CL-[0-9]{3}\");\n    System.out.println(id.matcher(\"xCL-123y\").matches());\n    System.out.println(id.matcher(\"xCL-123y\").find());\n  }\n}"
    },
    {
      "title": "Preserving trailing empty columns",
      "intro": "A delimited export can contain empty fields that still matter to the record layout.",
      "points": [
        "The default String.split behavior can remove trailing empty fields. Use a negative limit when you need to retain them.",
        "This example assumes a simple unquoted delimiter. For a real CSV file with quoted commas or line breaks, use a parser appropriate to that format.",
        "Validate the column count before mapping indexes to field names. A missing final position can otherwise shift or bypass required-field checks."
      ],
      "q": "How would you detect a missing trailing export field?",
      "a": "I would define the expected number of columns and parse using the file format’s rules. For the simple training row, preserving the trailing empty field lets me distinguish an empty final value from a missing column.",
      "practice": "Predict the length of splitting CL1,open, with and without a negative limit.",
      "source": [
        "Oracle Java API · String",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      ],
      "language": "Java 11+ · save as Example21.java and run java Example21.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example21 {\n  public static void main(String[] args) throws Exception {\n    String row = \"CL1,open,\";\n    System.out.println(row.split(\",\").length);\n    System.out.println(row.split(\",\", -1).length);\n  }\n}"
    },
    {
      "title": "Replacing literal characters in test data",
      "intro": "A helper for preparing policy references can accidentally treat literal punctuation as a regular expression.",
      "points": [
        "String.replace accepts a literal target and replacement. replaceAll interprets its first argument as a regex, so a dot has special meaning.",
        "Define precisely which punctuation can be normalized. Replacing every symbol indiscriminately can make two different references appear equal.",
        "Write tests for an input containing no target character, one occurrence and several occurrences. Retain the original text in failure evidence."
      ],
      "q": "Which method would you choose to change literal dots to hyphens?",
      "a": "I would use replace for a literal transformation and test that unaffected characters remain unchanged. I would use a regex only if the requirement explicitly describes a pattern across several character types.",
      "practice": "Predict the result of replacing a literal dot in PC.02.A and compare it with a regex dot pattern.",
      "source": [
        "Oracle Java API · String",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      ],
      "language": "Java 11+ · save as Example22.java and run java Example22.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example22 {\n  public static void main(String[] args) throws Exception {\n    String reference = \"PC.02.A\";\n    System.out.println(reference.replace(\".\", \"-\"));\n  }\n}"
    },
    {
      "title": "Filtering rows with a stream pipeline",
      "intro": "A stream can express a selection clearly when the expected filter and result shape are defined.",
      "points": [
        "Use filter to retain records matching the test condition and collect the results into the list required by the assertion.",
        "Keep expected values independent of the system being tested. Reusing the production filter to build expectations can reproduce its defect.",
        "Test zero, one and multiple matches. Confirm whether duplicate matches and encounter order should be preserved in the output."
      ],
      "q": "How would you test a filter that returns open claims?",
      "a": "I would seed known open and closed records and compare the complete returned set or sequence with explicit expected identifiers. A count alone could pass if the application substitutes the wrong claim.",
      "practice": "Modify the sample so there are no open records and state the expected result type and size.",
      "source": [
        "Oracle Java API · Stream",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      ],
      "language": "Java 11+ · save as Example23.java and run java Example23.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example23 {\n  public static void main(String[] args) throws Exception {\n    List<String> states = List.of(\"open\",\"closed\",\"open\");\n    List<String> selected = states.stream().filter(\"open\"::equals).collect(Collectors.toList());\n    System.out.println(selected);\n  }\n}"
    },
    {
      "title": "Handling search results with Optional",
      "intro": "A search helper can return a meaningful absence when no matching claim exists. The test must decide whether that absence is expected.",
      "points": [
        "Use findFirst when the first matching element answers the requirement. If the match must be unique, check cardinality as a separate condition.",
        "Inspect presence before extracting a value when absence is an allowed outcome. For a required match, fail with the searched identifier.",
        "Avoid replacing an absent result with a plausible real identifier, because that can blur the difference between a match and a fallback."
      ],
      "q": "What would you assert for a search that should return no claims?",
      "a": "I would assert that the search result is empty for the controlled input. For a positive case I would require the expected identifier and, if relevant, uniqueness. I would keep a missing result distinct from an application error.",
      "practice": "Create a positive and a negative search example, then add a duplicate-match case.",
      "source": [
        "Oracle Java API · Optional",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html"
      ],
      "language": "Java 11+ · save as Example24.java and run java Example24.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example24 {\n  public static void main(String[] args) throws Exception {\n    Optional<String> found = List.of(\"CL1\",\"CL2\").stream().filter(\"CL9\"::equals).findFirst();\n    System.out.println(found.isEmpty());\n  }\n}"
    },
    {
      "title": "Designing immutable test-case inputs",
      "intro": "A small immutable fixture makes it clear which inputs and expected outcome belong together.",
      "points": [
        "Declare named fields for the input and expected outcome so that a test cannot accidentally swap two similarly typed parameters.",
        "Keep construction separate from browser or API calls. The same fixture can drive tests at different layers when its assumptions fit both.",
        "Final fields holding immutable values work for this example. If a field contains a mutable list, take a suitable copy before sharing the fixture."
      ],
      "q": "Why use a value object instead of a long array of positional arguments?",
      "a": "I can read the test using meaningful names, validate the fixture at construction and keep the expected result next to its input. This makes it easier to add a boundary case without changing the business assertions.",
      "practice": "Add cases for the amount immediately below and above an agreed minimum of one.",
      "source": [
        "Oracle Java API · Object",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html"
      ],
      "language": "Java 11+ · save as Example25.java and run java Example25.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example25 {\n  public static void main(String[] args) throws Exception {\n    class Case {\n      final int amount; final boolean accepted;\n      Case(int amount, boolean accepted) { this.amount=amount; this.accepted=accepted; }\n    }\n    Case boundary = new Case(1, true);\n    System.out.println((boundary.amount >= 1) == boundary.accepted);\n  }\n}"
    },
    {
      "title": "Reading fixture lines with managed resources",
      "intro": "A test may read a file, stream or reader as part of its setup. Resource ownership belongs with the code that opened it.",
      "points": [
        "A try-with-resources statement closes its AutoCloseable resources on leaving the block, including exceptional exits.",
        "Check file format and record count separately from successful reading. An empty or truncated fixture can be read without an I/O error.",
        "The example uses an in-memory reader so it runs without a file. For real exports, specify encoding and preserve the path in error evidence."
      ],
      "q": "What would you check when a data-driven test silently runs zero cases?",
      "a": "I would inspect whether the fixture opened, whether the parser accepted any rows and whether the expected minimum row count was enforced. I would ensure the resource was closed and surface setup errors instead of treating an empty run as success.",
      "practice": "Adapt the example to reject a fixture with fewer than two nonblank rows.",
      "source": [
        "Oracle Java API · BufferedReader",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedReader.html"
      ],
      "language": "Java 11+ · save as Example26.java and run java Example26.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example26 {\n  public static void main(String[] args) throws Exception {\n    try (BufferedReader reader = new BufferedReader(new StringReader(\"CL1\\nCL2\\n\"))) {\n      long count = reader.lines().filter(s -> !s.isBlank()).count();\n      System.out.println(count);\n    }\n  }\n}"
    },
    {
      "title": "Retaining the cause of fixture failures",
      "intro": "A failed setup step should identify the affected fixture while keeping the original diagnostic information available.",
      "points": [
        "Catch a specific exception when you can add meaningful context or recover. A blanket catch-and-continue can make later assertions misleading.",
        "When wrapping an exception, pass the original error as the cause. Include a safe record identifier in the message for investigation.",
        "Test the failure path deliberately with malformed data. Avoid printing confidential payloads or tokens simply to make debugging easier."
      ],
      "q": "How would you report a bad quantity without losing the parse error?",
      "a": "I would wrap the parsing failure with a clear fixture identifier and retain the original cause. The caller can then diagnose both the affected record and the underlying problem. I would allow the test setup to fail rather than silently substituting a value.",
      "practice": "Inspect the exception message and cause for a fixture whose quantity is the text ten.",
      "source": [
        "Oracle Java API · IllegalArgumentException",
        "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/IllegalArgumentException.html"
      ],
      "language": "Java 11+ · save as Example27.java and run java Example27.java",
      "code": "import java.util.*;\nimport java.math.*;\nimport java.time.*;\nimport java.io.*;\nimport java.util.regex.*;\nimport java.util.stream.*;\n\nclass Example27 {\n  public static void main(String[] args) throws Exception {\n    try {\n      try { Integer.parseInt(\"ten\"); }\n      catch (NumberFormatException e) { throw new IllegalArgumentException(\"Bad quantity in fixture CL1\",e); }\n    } catch (IllegalArgumentException e) {\n      System.out.println(e.getMessage());\n      System.out.println(e.getCause().getClass().getSimpleName());\n    }\n  }\n}"
    }
  ],
  "api": [
    {
      "title": "HTTP methods and business intent",
      "intro": "Choose assertions around the operation promised by the endpoint, not only the verb’s familiar name.",
      "points": [
        "GET retrieves a representation; POST, PUT and DELETE have different method semantics. An endpoint contract still defines its specific business operation.",
        "Example: a claim search should not unexpectedly create or modify a claim. Compare relevant state before and after the request.",
        "Exercise unsupported methods and confirm they do not trigger side effects. Use disposable test records for operations that change data."
      ],
      "q": "Can a successful GET prove the resource was created correctly?",
      "a": "It proves only what its assertions cover. I would compare returned fields with independent expected values and verify the intended resource identifier. A list response containing any claim is weaker than retrieving the exact claim created by the scenario.",
      "practice": "Map create, retrieve, replace and delete operations for a fictional claims service.",
      "source": [
        "IETF · HTTP semantics",
        "https://www.rfc-editor.org/rfc/rfc9110.html"
      ]
    },
    {
      "title": "PUT, PATCH and update precision",
      "intro": "An update test needs to distinguish fields intentionally changed from fields that should remain intact.",
      "points": [
        "PUT and PATCH are not interchangeable shortcuts. Read the API’s replacement or partial-update contract, including omitted and null fields.",
        "Example: change a claim description while retaining loss date and policy reference. Verify every protected field, not just the edited text.",
        "Test unknown fields, invalid values and attempts to modify read-only properties. Confirm failure does not leave a partially updated record."
      ],
      "q": "How would you detect an update that erases unrelated data?",
      "a": "I would create a record with distinctive values, save its expected state, update one permitted field and compare all other relevant fields. I would test omitted, explicit null and empty values separately because they can have different meanings.",
      "practice": "Design three update cases for omitted, null and empty description values under a documented contract.",
      "source": [
        "OpenAPI · Specification",
        "https://spec.openapis.org/oas/latest.html"
      ]
    },
    {
      "title": "Status codes and error classification",
      "intro": "An expected status narrows the result, but the response body and state explain whether the behavior is correct.",
      "points": [
        "Classify successful, client-error and server-error outcomes before selecting exact expected codes from the contract.",
        "Example: distinguish invalid input from a nonexistent claim and an unavailable downstream service. The client may need different recovery actions.",
        "Test that an error response preserves state and avoids exposing internal stack traces. Do not accept any 4xx code as equally correct."
      ],
      "q": "Why is asserting status less than 500 weak?",
      "a": "It can classify an unauthorized or validation-failed request as successful. I would assert the specific contracted status and business result, then verify error structure or resource state. Broad ranges are useful for diagnostics, not as a substitute for precise expected behavior.",
      "practice": "Create an outcome table for valid input, malformed input, missing identity and unavailable dependency.",
      "source": [
        "IETF · HTTP semantics",
        "https://www.rfc-editor.org/rfc/rfc9110.html"
      ]
    },
    {
      "title": "Headers and content negotiation",
      "intro": "Request and response metadata can change how the same endpoint interprets or represents information.",
      "points": [
        "Content-Type describes the representation being sent, while Accept expresses response preferences. Verify the formats the service actually supports.",
        "Example: submit JSON with the correct header, then a mismatched or unsupported type. Check predictable validation and unchanged data.",
        "Inspect response content type, encoding and required custom headers. Ensure a proxy-generated HTML error is not parsed as a successful JSON response."
      ],
      "q": "What would you check when a response cannot be parsed as JSON?",
      "a": "I would inspect status, content type and a safely redacted raw body. A gateway error or incorrect endpoint might return HTML. I would fix the underlying response mismatch rather than suppressing parsing failures or treating an empty object as valid data.",
      "practice": "List header assertions for a JSON claim-creation endpoint and its error response.",
      "source": [
        "IETF · HTTP semantics",
        "https://www.rfc-editor.org/rfc/rfc9110.html"
      ]
    },
    {
      "title": "JSON shape, optional fields and nulls",
      "intro": "A schema describes valid structure; business assertions establish whether the specific values make sense.",
      "points": [
        "Separate required properties, nullable values and optional properties. An absent field is not always equivalent to a field containing null.",
        "Example: a closed claim may require a closure date under the contract while an open claim does not. Test both shape and state-dependent rules.",
        "Use schema validation plus explicit assertions on identifiers, dates and totals. A string containing the wrong policy number can still satisfy a string schema."
      ],
      "q": "Can schema validation replace functional assertions?",
      "a": "No. It can detect incorrect structure or types, but many wrong business values remain schema-valid. I would validate the schema, then compare the fields relevant to the scenario against independently prepared expectations and cross-field rules.",
      "practice": "Create cases for missing, null and wrong-type values in a required amount property.",
      "source": [
        "OpenAPI · Specification",
        "https://spec.openapis.org/oas/latest.html"
      ]
    },
    {
      "title": "Bearer-token handling and expiry",
      "intro": "A protected endpoint must reject unsuitable credentials without exposing them through test artifacts.",
      "points": [
        "Bearer tokens grant access to whoever possesses them, so use approved test identities and redact token values from logs.",
        "Example: exercise a valid token, expired token, missing token and token issued for an unsuitable audience when the identity platform supports that distinction.",
        "Separate token acquisition failures from resource authorization failures. Avoid silently refreshing credentials inside a test intended to verify expiry."
      ],
      "q": "How would you make token-expiry testing deterministic?",
      "a": "I would use a controlled short-lived test token or supported test identity setup, record its validity window and execute within known timing boundaries. I would disable helper behavior that automatically refreshes it and assert the contracted rejection and unchanged resource state.",
      "practice": "Write separate expected outcomes for absent, expired and valid-but-insufficient-scope credentials.",
      "source": [
        "IETF · Bearer tokens",
        "https://www.rfc-editor.org/rfc/rfc6750.html"
      ]
    },
    {
      "title": "Object-level authorization",
      "intro": "A user allowed to call an endpoint may still be prohibited from accessing a particular record.",
      "points": [
        "Create two authorized test users with separate owned resources. Keep identity permission and resource ownership as separate dimensions.",
        "Example: user A retrieves their claim, then requests user B’s claim identifier through the same route. Verify denial without sensitive data leakage.",
        "Repeat ownership checks for update, delete, attachments and nested resources. Hiding a record in list results does not secure its direct URL."
      ],
      "q": "How would you test cross-account data access?",
      "a": "I would create known records for two test accounts and attempt the same operations under each identity. I would verify the approved denial response and confirm no state change. I would also inspect nested resources and response fields for partial leakage.",
      "practice": "Build an owner/nonowner matrix for read, update and attachment retrieval.",
      "source": [
        "OWASP · API Security Top 10",
        "https://api-security.owasp.org/editions/2023/en/0x11-t10/"
      ]
    },
    {
      "title": "Property-level authorization and mass assignment",
      "intro": "Sensitive fields require protection even when the caller is allowed to modify the resource itself.",
      "points": [
        "Identify fields users may edit, fields visible only to privileged roles and fields the server alone controls.",
        "Example: include an approval flag or internal settlement amount in a normal claimant’s update. Verify rejection or documented ignoring without privileged changes.",
        "Compare responses across roles so confidential properties are not exposed accidentally. Test both nested and top-level fields."
      ],
      "q": "Why is hiding an approval control in the UI insufficient?",
      "a": "A caller can submit the field directly to the API. I would verify server-side field authorization with a low-privilege test identity and inspect persisted state afterward. The response should also avoid revealing restricted values merely because the update itself was denied.",
      "practice": "Identify three server-controlled properties for a fictional payment-approval resource.",
      "source": [
        "OWASP · API Security Top 10",
        "https://api-security.owasp.org/editions/2023/en/0x11-t10/"
      ]
    },
    {
      "title": "Pagination and complete result sets",
      "intro": "Pagination tests should prove coverage and uniqueness, not merely that the next-page control exists.",
      "points": [
        "Seed a known dataset with distinct identifiers and a stable sort. Define the expected result set before requesting pages.",
        "Example: retrieve 23 claims in pages of 10. Compare the union of identifiers and ensure no page overlaps unexpectedly.",
        "Exercise empty results, final partial pages, invalid page size and expired cursors. Clarify consistency rules when data changes during traversal."
      ],
      "q": "How do you detect skipped records across pages?",
      "a": "I compare collected identifiers against the expected set, including duplicates and missing values. I also verify the sort order and continuation contract. Matching the reported total alone is insufficient because one duplicated record can conceal one missing record.",
      "practice": "Prepare expected page sizes and identifiers for 23 records with a limit of 10.",
      "source": [
        "OpenAPI · Specification",
        "https://spec.openapis.org/oas/latest.html"
      ]
    },
    {
      "title": "Filtering, sorting and query parameters",
      "intro": "Search behavior needs exact rules for matching, ordering and invalid combinations.",
      "points": [
        "Define whether a filter is exact, partial, case-sensitive or range-based. Do not infer semantics from the UI label.",
        "Example: create similar policy numbers and loss dates at range boundaries. Check every returned identifier and verify excluded records stay absent.",
        "Test combined filters, unsupported sort fields and equal sort values. Use a documented secondary ordering for repeatable pagination assertions."
      ],
      "q": "Why can a search test pass while filtering is broken?",
      "a": "A test that checks only that one expected item appears may overlook unrelated results. I would compare the complete expected set, assert that excluded records are absent and test combinations that distinguish AND from OR behavior.",
      "practice": "Design a dataset that distinguishes exact matching, partial matching and case-insensitive matching.",
      "source": [
        "OpenAPI · Specification",
        "https://spec.openapis.org/oas/latest.html"
      ]
    },
    {
      "title": "Conditional requests and lost-update protection",
      "intro": "Concurrent edits should follow an explicit conflict policy instead of silently overwriting newer data.",
      "points": [
        "Where supported, version identifiers or conditional request headers let the service detect stale updates. Verify the mechanism actually used by your API.",
        "Example: two clients read the same claim. Client A saves a change; client B then submits an update based on the old version.",
        "Assert the documented conflict outcome and retained fields. Do not automatically retry a stale update without re-evaluating the newer resource."
      ],
      "q": "How would you test optimistic concurrency?",
      "a": "I would retain the original version in two clients, update through one and submit the stale version through the other. I would verify that the conflict is visible and A’s change remains intact. Then I would test a deliberate refresh and valid new update.",
      "practice": "Draw a two-client timeline showing read versions, successful update and stale update.",
      "source": [
        "IETF · HTTP semantics",
        "https://www.rfc-editor.org/rfc/rfc9110.html"
      ]
    },
    {
      "title": "Cache behavior and fresh data",
      "intro": "A cached response can be valid or dangerously stale depending on the resource’s caching contract.",
      "points": [
        "Inspect cache directives and validators where applicable. Distinguish stored representations from fresh backend reads.",
        "Example: retrieve a claim summary, update it through an authorized path and verify the documented refresh or revalidation behavior.",
        "Test identity separation: private account data must not appear in another user’s cached response. Record relevant response headers during diagnosis."
      ],
      "q": "How do you investigate stale API data?",
      "a": "I compare the authoritative stored state, direct service response and any gateway or client cache evidence. I inspect validators and cache directives before assuming an update failed. My test should state the permitted staleness window rather than relying on an arbitrary sleep.",
      "practice": "Create a cache test for a public reference list and a separate test for private claim data.",
      "source": [
        "IETF · HTTP caching",
        "https://www.rfc-editor.org/rfc/rfc9111.html"
      ]
    },
    {
      "title": "Rate limits and bounded retries",
      "intro": "Traffic controls should produce predictable client behavior without turning retries into additional overload.",
      "points": [
        "Use an approved test environment and agreed request volumes. Determine the limit’s scope, such as identity, application or route.",
        "Example: cross a documented threshold and verify the contracted rejection and retry information, then confirm recovery after the relevant window.",
        "Use bounded backoff for appropriate transient failures and honor server guidance. Never retry every validation error or an unsafe write indiscriminately."
      ],
      "q": "What should a rate-limit test assert beyond an error code?",
      "a": "I would verify limit scope, response guidance, unchanged business state and recovery behavior. I would also ensure one test identity does not unintentionally consume shared capacity needed by other suites. Retry behavior should stop at a deadline and retain evidence.",
      "practice": "Design a small controlled burst test with a recovery check and an explicit maximum request count.",
      "source": [
        "IETF · Additional HTTP status codes",
        "https://www.rfc-editor.org/rfc/rfc6585.html"
      ]
    },
    {
      "title": "Structured API errors and problem details",
      "intro": "Errors should help clients identify a failed operation without requiring them to parse human wording.",
      "points": [
        "Validate stable error identifiers and the documented error shape. Problem Details is one standardized format, but use it only where the API adopts it.",
        "Example: send an invalid loss date and check the indicated field and problem category. Avoid asserting an entire localized sentence unless it is contractual.",
        "Inspect error payloads for secrets, database details and internal traces. Verify related state remains unchanged after rejection."
      ],
      "q": "How do you make error assertions resilient?",
      "a": "I assert stable machine-readable properties and the relevant field or category, then check that the message is useful without depending on incidental punctuation. I also verify that the status and body agree. This catches genuine contract failures while reducing cosmetic brittleness.",
      "practice": "Write expected errors for invalid date, missing field and unknown resource cases.",
      "source": [
        "IETF · Problem details",
        "https://www.rfc-editor.org/rfc/rfc9457.html"
      ]
    },
    {
      "title": "Asynchronous operation polling",
      "intro": "Acceptance means work was received; a separate check is needed to establish its eventual outcome.",
      "points": [
        "Capture the operation identifier or status location provided by the contract. Poll that operation, not an unrelated list endpoint.",
        "Example: a document-generation request returns before the document exists. Check intermediate status, terminal success and the produced artifact.",
        "Set a deadline and poll interval, preserve the final observed response and handle terminal failure immediately. Fixed sleeps waste time and hide diagnostics."
      ],
      "q": "How would you avoid an endless asynchronous test?",
      "a": "I would define a maximum duration, recognize success and failure terminal states and report the operation identifier with the last response on timeout. I would verify the final business artifact, because a success flag alone may not prove that the expected document is usable.",
      "practice": "Write a polling decision table for pending, successful, failed and unknown states.",
      "source": [
        "IETF · HTTP semantics",
        "https://www.rfc-editor.org/rfc/rfc9110.html"
      ]
    },
    {
      "title": "Webhook delivery and duplicate events",
      "intro": "A callback integration must handle identity, repetition and ordering according to its explicit delivery contract.",
      "points": [
        "Use a controlled receiver to capture event identifiers, payloads and authentication evidence. Keep test destinations separate from production systems.",
        "Example: send a payment result twice and verify that the downstream business effect occurs once under the documented deduplication policy.",
        "Exercise delayed, out-of-order and invalidly authenticated events. Validate replay windows or signatures only against the provider’s published scheme."
      ],
      "q": "How would you test a webhook arriving before its related record?",
      "a": "I would control event ordering, verify the intended pending or failure handling and then introduce the missing prerequisite. I would check reconciliation and duplicate prevention during recovery. I would not assume the sender guarantees ordering unless the integration contract says so.",
      "practice": "Create an event sequence covering duplicate delivery, late arrival and receiver timeout.",
      "source": [
        "OWASP · API Security Top 10",
        "https://api-security.owasp.org/editions/2023/en/0x11-t10/"
      ]
    },
    {
      "title": "Postman variable scopes and environments",
      "intro": "Reusable collections need clear separation between environment configuration and per-test data.",
      "points": [
        "Store base URLs in the intended environment and keep generated record identifiers in an appropriate short-lived scope.",
        "Example: run the same collection against two test environments and verify the resolved host before any state-changing request.",
        "Avoid identical variable names at several scopes unless intentional. Use secret storage for credentials and inspect exports before sharing them."
      ],
      "q": "What can cause Postman to call the wrong environment?",
      "a": "An incorrect active environment or a variable shadowed by a narrower scope can resolve the wrong value. I would inspect the actual request destination and variable resolution, then separate configuration from generated data. I would add a safe environment precondition for destructive test flows.",
      "practice": "List variables for base URL, access token and newly created claim ID with their intended scopes.",
      "source": [
        "Postman · Variables",
        "https://learning.postman.com/docs/use/send-requests/variables/variables"
      ]
    },
    {
      "title": "Postman pre-request setup",
      "intro": "Pre-request scripts prepare a request; they should not silently hide missing prerequisites or change the test’s purpose.",
      "points": [
        "Use setup scripts for controlled timestamps, unique test references or request data derived from prior results.",
        "Example: generate a run-specific external reference so parallel tests do not modify the same synthetic claim.",
        "Fail clearly if required configuration is absent. Avoid logging credentials or adding an automatic token refresh to an expiry-negative test."
      ],
      "q": "How would you keep dynamic data reproducible?",
      "a": "I would record the generated nonsecret reference and the business inputs in test evidence. Where possible I would use a known seed or explicit data row, so a failure can be recreated. Dynamic values should prevent collisions without making expected outcomes unknowable.",
      "practice": "Prepare a pre-request checklist for required environment values and a unique external reference.",
      "source": [
        "Postman · Pre-request scripts",
        "https://learning.postman.com/docs/tests-and-scripts/write-scripts/pre-request-scripts"
      ]
    },
    {
      "title": "Postman assertions and response extraction",
      "intro": "Extracting a value should happen only after establishing that the response contains a valid value for the next step.",
      "points": [
        "Use named assertions so reports explain which expectation failed. Assert important business fields as well as status.",
        "Example: after creating a fictional claim, check its ID before storing it for a subsequent retrieval request.",
        "Keep failure behavior explicit: a failed assertion should not leave stale variables from an earlier run available to dependent requests."
      ],
      "q": "Why can request chaining produce misleading passes?",
      "a": "A stale identifier may survive a failed setup request, causing later checks to validate an old resource. I would clear or scope generated values, assert creation first and stop or skip dependent work when setup fails. Each scenario should own its data.",
      "practice": "Write an assertion that validates a nonempty ID before using it in another request.",
      "source": [
        "Postman · Post-response tests",
        "https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/"
      ],
      "code": "// Fictional API response shape.\npm.test(\"created claim has an id\", () => {\n  const body = pm.response.json();\n  pm.expect(body.id).to.be.a(\"string\").and.not.empty;\n});",
      "language": "JavaScript · Postman"
    },
    {
      "title": "Data-driven Postman collection runs",
      "intro": "Each data row should make a distinct behavior and expected result visible in the report.",
      "points": [
        "Use a CSV or JSON dataset with input and expected-result fields. Keep sensitive customer information out of shared fixtures.",
        "Example: run valid, missing and boundary loss-date cases through the same validation request without mixing unrelated workflows.",
        "Check type interpretation, empty values and case-sensitive variable names. Keep generated records isolated between iterations and define cleanup for failures."
      ],
      "q": "What makes a useful API data provider?",
      "a": "It contains small, identifiable cases with explicit expected outcomes. I would separate invalid-input checks from successful creation flows when their setup or assertions differ substantially. A giant dataset is not valuable if failures cannot be traced to a clear rule.",
      "practice": "Create five JSON data rows with caseName, amount and expectedStatus fields.",
      "source": [
        "Postman · Data-driven collection runs",
        "https://learning.postman.com/docs/tests-and-scripts/running-collections/test-data/working-with-data-files"
      ]
    },
    {
      "title": "REST Assured request and response specifications",
      "intro": "Shared specifications reduce repetition while the scenario retains ownership of its business assertions.",
      "points": [
        "Centralize stable configuration such as base URI and common headers in request specifications. Keep changing credentials and data safely scoped.",
        "Example: reuse a response content-type expectation while asserting each claim’s specific status and policy association in its own test.",
        "Avoid shared mutable specifications across parallel tests when they contain request-specific values. Keep failure logging redacted."
      ],
      "q": "What would you share in a REST Assured framework?",
      "a": "I would share configuration, serialization helpers and stable protocol assertions. I would keep scenario-specific expected values and fixtures close to the tests. Excessively broad helpers can hide what was actually sent or asserted, so reports should expose useful redacted evidence.",
      "practice": "Sketch a request specification and identify which fields must remain per test.",
      "source": [
        "REST Assured · Usage guide",
        "https://github.com/rest-assured/rest-assured/wiki/Usage"
      ]
    },
    {
      "title": "REST Assured JSON extraction and typed expectations",
      "intro": "Response extraction should preserve the meaning and type of each value used in assertions.",
      "points": [
        "Extract identifiers, amounts and nested fields deliberately; do not convert every value to a string merely to make comparisons pass.",
        "Example: compare a returned currency and amount against an expected payment object, then use the returned ID to read the same resource.",
        "Test empty arrays and missing nested properties. Avoid selecting the first list element unless order and uniqueness are guaranteed."
      ],
      "q": "Why are first-element assertions fragile?",
      "a": "A query can return multiple records or change its order. I would locate the expected identifier, verify uniqueness and assert its fields. For an ordered contract, I would validate the ordering explicitly rather than depending on the incidental database result order.",
      "practice": "Write pseudocode that finds exactly one payment by external reference before comparing its amount.",
      "source": [
        "REST Assured · Usage guide",
        "https://github.com/rest-assured/rest-assured/wiki/Usage"
      ]
    },
    {
      "title": "API versioning and backward compatibility",
      "intro": "An interface change can break a consumer even when the provider’s newest tests pass.",
      "points": [
        "Track which versions and consumer contracts must remain supported. Classify removed fields, changed types and newly required inputs as potential breaks.",
        "Example: a consumer expects a numeric amount but a new release returns formatted text. Validate older consumer expectations against the candidate release.",
        "Include error and pagination contracts, not just successful payloads. Document deprecation and migration expectations with the owning teams."
      ],
      "q": "Is adding a response field always safe?",
      "a": "Not necessarily; strict consumers or enum handling can still be affected. I would inspect the actual compatibility contract and exercise representative consumers. A schema diff helps identify risk, but consumer behavior provides stronger evidence than a general assumption about additive changes.",
      "practice": "Assess three proposed changes: optional field added, required input added and enum value added.",
      "source": [
        "OpenAPI · Specification",
        "https://spec.openapis.org/oas/latest.html"
      ]
    },
    {
      "title": "API test data ownership and cleanup",
      "intro": "Reliable integration tests create only the data they need and can identify their records after a partial failure.",
      "points": [
        "Attach a unique run reference to synthetic records where supported. Track created IDs as setup progresses.",
        "Example: if claim creation succeeds but payment setup fails, cleanup still knows which claim belongs to this run.",
        "Avoid deleting by broad name patterns or shared account criteria. Validate cleanup independently and retain useful evidence before removing fixtures."
      ],
      "q": "How would you handle cleanup when a test fails halfway through?",
      "a": "I would register each created resource as soon as its identifier is known and use a teardown path that runs on failure. Cleanup should target only those identifiers and respect dependencies. A cleanup failure should be reported without obscuring the original business failure.",
      "practice": "Create a dependency-aware cleanup order for account, policy, claim and attachment fixtures.",
      "source": [
        "REST Assured · Usage guide",
        "https://github.com/rest-assured/rest-assured/wiki/Usage"
      ]
    },
    {
      "title": "API performance checks and percentiles",
      "intro": "Functional response timing is useful evidence, but a single fast request is not a performance assessment.",
      "points": [
        "Define the workload, data volume and environment before interpreting latency. Separate client overhead from service-side measurements where possible.",
        "Example: compare claim-search latency for small and large result sets under agreed concurrency rather than one repeated cached request.",
        "Record percentiles, errors and throughput together. Run load only in an approved environment with explicit capacity and stopping conditions."
      ],
      "q": "Why is average response time insufficient?",
      "a": "Averages can hide a slow tail and do not show whether errors rose under load. I would examine percentile latency, throughput and failures for a representative workload. I would also compare environment capacity and dataset size before drawing conclusions about production behavior.",
      "practice": "Describe a small search-performance experiment with workload, measures and an agreed stopping threshold.",
      "source": [
        "IETF · Additional HTTP status codes",
        "https://www.rfc-editor.org/rfc/rfc6585.html"
      ]
    },
    {
      "title": "API file upload and download verification",
      "intro": "A successful transfer status does not establish that the correct file is linked, stored and retrievable.",
      "points": [
        "Test allowed types, size boundaries and metadata using harmless synthetic files. Confirm the contract for multipart or other upload formats.",
        "Example: upload two distinct claim documents and verify content integrity and attachment ownership on download.",
        "Include interrupted transfers, duplicate names and unauthorized retrieval. Keep filenames and metadata from exposing real customer information in test logs."
      ],
      "q": "How would you verify a downloaded document?",
      "a": "I would check the expected content type, size where deterministic and file integrity or known content. I would verify the attachment belongs to the intended claim and is accessible only to permitted identities. A 200 response containing an error document should fail.",
      "practice": "Define upload and download checks for a synthetic PDF and a file just above the size limit.",
      "source": [
        "OWASP · API Security Top 10",
        "https://api-security.owasp.org/editions/2023/en/0x11-t10/"
      ]
    },
    {
      "title": "Service virtualization and dependency failures",
      "intro": "Simulated dependencies let you exercise difficult conditions while keeping the test’s scope honest.",
      "points": [
        "Stub only the dependency boundary needed for a scenario, with realistic response structure and timing.",
        "Example: simulate a payment-provider timeout and a later success acknowledgment to test the application’s recovery behavior.",
        "Keep separate tests for the real integration and maintain stubs against the contract. A mock returning ideal data cannot prove the provider behaves correctly."
      ],
      "q": "When would you choose a stub over a live dependency?",
      "a": "I would use it for deterministic component checks and rare error states that are difficult or costly to reproduce. I would label the tested boundary clearly and retain a smaller set of real integration checks. Stub drift must be monitored so the simulation stays meaningful.",
      "practice": "Design three simulated provider responses: validation error, temporary failure and successful completion.",
      "source": [
        "OpenAPI · Specification",
        "https://spec.openapis.org/oas/latest.html"
      ]
    }
  ],
  "manual": [
    {
      "title": "Equivalence partitions in business forms",
      "intro": "Equivalence partitioning groups inputs expected to behave similarly. Choose representatives deliberately rather than entering many arbitrary values.",
      "points": [
        "For a fictional driver age rule accepting 18 through 75, separate below-range, accepted-range and above-range inputs before writing cases.",
        "Treat missing, alphabetic and decimal entries separately when their validation rules differ. An accepted integer does not represent malformed text.",
        "Record why each group should behave alike. If age 25 changes a surcharge, split the accepted range around that additional business rule."
      ],
      "q": "Does one valid age prove every accepted age works?",
      "a": "No. A representative provides targeted coverage of a stated partition, not a mathematical proof. I combine partition representatives with boundaries and any age-dependent pricing rules. Unexpected differences can reveal that my original partition model was too broad.",
      "practice": "Partition a fictional vehicle-year field and state one expected result for every group.",
      "source": [
        "ISTQB · Foundation Level syllabus",
        "https://istqb.org/?download_id=3345&sdm_process_download=1"
      ]
    },
    {
      "title": "Boundary values and inclusive limits",
      "intro": "Boundary value analysis concentrates checks around edges where ordered input rules change.",
      "points": [
        "For a fictional payment maximum of 10,000.00, test the exact maximum and neighboring permitted precision values rather than only a typical payment.",
        "Clarify whether the limit is inclusive, which currency applies and whether rounding happens before comparison. These choices change expected outcomes.",
        "Include minimums, date cutoffs and field lengths. Capture persisted values because a displayed rounded amount can conceal an invalid stored amount."
      ],
      "q": "How do you choose neighboring boundary values?",
      "a": "I use the smallest meaningful increment for that field. For integer quantities that may be one; for a two-decimal amount it may be 0.01. I first confirm precision and the business comparison rule so the test does not encode an assumption.",
      "practice": "Design five cases around a hypothetical 30-day reporting deadline, including its time-zone assumption.",
      "source": [
        "ISTQB · Foundation Level syllabus",
        "https://istqb.org/?download_id=3345&sdm_process_download=1"
      ]
    },
    {
      "title": "Decision tables for interacting rules",
      "intro": "A decision table connects combinations of conditions to expected actions, making missing or conflicting rules visible.",
      "points": [
        "For a fictional refund approval, list amount band, payment clearance and reviewer authority as separate conditions instead of hiding them inside prose.",
        "Mark impossible combinations with a reason. Do not discard an inconvenient combination just because the UI makes it difficult to create.",
        "Give each feasible rule a case and agreed expected action. Ask the product owner to resolve contradictions before executing against the implementation."
      ],
      "q": "When is a decision table better than a list of scenarios?",
      "a": "It is especially useful when several conditions jointly decide an outcome. A scenario list may accidentally repeat one combination and omit another. I still use readable business examples, but the table shows which combinations those examples actually cover.",
      "practice": "Create a table for a fictional discount using eligibility, renewal status and approval.",
      "source": [
        "ISTQB · Foundation Level syllabus",
        "https://istqb.org/?download_id=3345&sdm_process_download=1"
      ]
    },
    {
      "title": "State transitions and forbidden actions",
      "intro": "State transition testing follows permitted and prohibited changes between meaningful business states.",
      "points": [
        "Sketch a fictional request moving from draft to submitted to approved or rejected. Label each transition with the triggering action and required role.",
        "Attempt an approval from draft and a second approval after completion. Check that rejected actions leave the record and downstream effects unchanged.",
        "Test a sequence, not only isolated screens: submit, reject, revise and resubmit may expose stale validation or missing history."
      ],
      "q": "Why test an invalid transition if its button is hidden?",
      "a": "The user may have a stale page or another channel may request the action. I verify the business rule at the supported boundary and inspect persisted state. A hidden button alone does not establish that an invalid transition is prevented.",
      "practice": "Draw a five-state workflow and identify two forbidden transitions with expected evidence.",
      "source": [
        "ISTQB · Foundation Level syllabus",
        "https://istqb.org/?download_id=3345&sdm_process_download=1"
      ]
    },
    {
      "title": "Pairwise combinations with explicit exclusions",
      "intro": "Pairwise selection covers pairs of parameter values while reducing a large combination set. It still requires judgment about higher-order risks.",
      "points": [
        "Consider browser, payment method, language and account type. Enumerate supported values and constraints before selecting a smaller combination set.",
        "Retain known risky three-way scenarios explicitly, such as a specific currency, payment method and jurisdiction. Pair coverage does not guarantee that combination.",
        "Keep the generated matrix with results so reviewers can see actual coverage. Rebuild it when supported values or exclusions change."
      ],
      "q": "Would you use pairwise testing for every financial rule?",
      "a": "No. I would preserve exhaustive coverage for a small critical decision table and use combination reduction where it is justified. The selection method must match failure risks, dependency constraints and available evidence, rather than simply reduce the case count.",
      "practice": "Reduce a four-parameter compatibility matrix while preserving one documented high-risk combination."
    },
    {
      "title": "Requirement reviews before execution",
      "intro": "A review can find ambiguous or missing behavior before a tester runs the software.",
      "points": [
        "Challenge a statement such as refunds process quickly: identify the starting event, completion event, measurable target and failure behavior.",
        "Look for missing roles, invalid data, date boundaries and dependencies. Record questions against the relevant requirement rather than scattering them through chat.",
        "Use one successful example and one counterexample during discussion. Agreement on these examples often exposes differing interpretations early."
      ],
      "q": "What makes a review comment actionable?",
      "a": "It identifies a specific ambiguity, explains the consequence and proposes a question or example that can resolve it. Saying a story is unclear offers little direction. I would ask what happens when a refund request arrives after the payment has been reversed.",
      "practice": "Review a fictional two-sentence cancellation requirement and write three precise clarification comments."
    },
    {
      "title": "Acceptance criteria and concrete examples",
      "intro": "Acceptance criteria describe outcomes that a story must satisfy. Concrete examples make the criteria easier to test and discuss.",
      "points": [
        "For a contact update, state who may change which fields, what validation applies and where the change should become visible.",
        "Agree on examples with business and development representatives. Include a rejected update and a successful update with observable results.",
        "Keep implementation choices separate from business expectations unless they are required constraints. A particular button location rarely defines the business outcome."
      ],
      "q": "Is completing every acceptance criterion sufficient for all testing?",
      "a": "It establishes coverage of those agreed conditions, but broader risks can remain. I also consider integration effects, usability, permissions and regression impact. If an important risk is outside the story criteria, I make the gap visible instead of assuming someone else covers it.",
      "practice": "Write three acceptance criteria and two examples for a fictional address change.",
      "source": [
        "Agile Manifesto · Principles",
        "https://agilemanifesto.org/principles.html"
      ]
    },
    {
      "title": "Traceability that supports change analysis",
      "intro": "Traceability connects a requirement or risk to its tests, results and related defects so a change can be assessed efficiently.",
      "points": [
        "Use stable identifiers for a payment requirement and its scenarios. Link automated and manual evidence to the same business expectation where appropriate.",
        "Distinguish designed, executed and passed coverage. A linked test that has never run does not demonstrate release readiness.",
        "When a rule changes, inspect its connected cases and dependent journeys. Update expected results with a reviewable explanation instead of silently replacing them."
      ],
      "q": "What would you put in a small traceability matrix?",
      "a": "I would include requirement or risk ID, scenario ID, relevant test level, execution result and outstanding defect link. The useful question is whether each important obligation has credible evidence. A large spreadsheet with stale links can create false confidence.",
      "practice": "Build a six-row matrix for refund creation, approval and payment with one deliberately uncovered risk."
    },
    {
      "title": "Agile testing throughout a Sprint",
      "intro": "Testing contributes to planning, implementation and feedback throughout delivery rather than beginning only after development finishes.",
      "points": [
        "During refinement, identify realistic examples and data needs. During implementation, discuss emerging behavior before a large handover builds up.",
        "Make blockers visible early: an unavailable payment simulator can threaten a story even when the UI is nearly complete.",
        "Use feedback to adjust the work with the team. Keep newly discovered business questions separate from confirmed implementation defects."
      ],
      "q": "How does a tester help a Sprint Goal?",
      "a": "I focus investigation on the behavior needed for that goal, raise evidence about risks and collaborate on getting the work into a usable state. I also help the team make testing visible in its plan so verification is not treated as spare time at the end.",
      "practice": "Plan testing activities across a short Sprint for a fictional invoice-download story.",
      "source": [
        "Agile Manifesto · Principles",
        "https://agilemanifesto.org/principles.html"
      ]
    },
    {
      "title": "Definition of Done and story acceptance",
      "intro": "The Definition of Done creates a shared quality threshold for an Increment; story acceptance examples describe particular behavior.",
      "points": [
        "A fictional address-change story may satisfy its field rules while still missing agreed accessibility or integration checks required for completion.",
        "Make completion evidence reviewable: identify which build, test results and unresolved issues support the claim that the work meets the team standard.",
        "If work does not meet the shared threshold, communicate it honestly. Avoid silently weakening the standard to make a progress report appear complete."
      ],
      "q": "Can acceptance criteria and Definition of Done be identical?",
      "a": "They usually answer different questions. Acceptance criteria concern a specific item, while the Definition of Done describes the shared quality state of the Increment. I would check both and clarify team terminology instead of treating a successful demonstration as sufficient proof.",
      "practice": "Separate five story-specific checks from five shared completion checks for a fictional customer portal.",
      "source": [
        "Scrum Guides · The Scrum Guide",
        "https://scrumguides.org/scrum-guide.html"
      ]
    },
    {
      "title": "Test levels and where a failure belongs",
      "intro": "Choosing the test level helps isolate failures and avoids relying on a long business journey for every small rule.",
      "points": [
        "A premium-rounding rule can be checked close to the calculation. A policy-to-billing message needs an integration check across the relevant boundary.",
        "Reserve a smaller set of complete journeys for behavior that depends on the assembled system. Keep the expected business outcome explicit.",
        "When an end-to-end case fails, identify the earliest incorrect observation. Do not assume the final screen owns the defect."
      ],
      "q": "Why not verify everything through the user interface?",
      "a": "UI scenarios provide valuable user evidence but often have more setup and more possible causes of failure. Lower-level checks can isolate a calculation or interface contract more directly. I choose a combination that exposes both local mistakes and real integration gaps.",
      "practice": "Assign five fictional payment risks to suitable test levels and explain the placement."
    },
    {
      "title": "Smoke checks after deployment",
      "intro": "A smoke suite answers whether a build is usable enough for deeper investigation, using a small set of essential observations.",
      "points": [
        "Select representative checks such as sign-in, account search and opening a known record. State what each check establishes and what it leaves untested.",
        "Confirm the deployed version and environment before execution. A successful check against an old instance can produce a misleading release signal.",
        "On failure, collect diagnostics and identify whether testing is blocked. Repeatedly rerunning a broken login without investigation wastes the available window."
      ],
      "q": "Does a passing smoke suite mean the release is safe?",
      "a": "No. It demonstrates only the narrow conditions the suite checks. I use it as a readiness gate for further testing and report the scope clearly. Business-rule coverage, integrations and nonfunctional risks still need the planned evidence for that release.",
      "practice": "Choose six smoke checks for a fictional billing portal and define a stop condition."
    },
    {
      "title": "Confirmation testing and regression selection",
      "intro": "Confirmation checks the reported fix; regression checks whether changes disturbed other behavior.",
      "points": [
        "Reproduce the original failure with its recorded preconditions, then run that case on the fixed build and compare the actual result.",
        "Inspect the changed component and its dependencies to select nearby regression cases. A date-validation fix may affect renewal and cancellation flows.",
        "Include a valid case as well as the previously failing input. A fix that rejects every request can make the original negative test appear successful."
      ],
      "q": "Would you close a bug after the original step passes?",
      "a": "I first confirm that the correct build and data were used and that the expected business result occurred. I then execute proportionate regression checks based on the change. If regression remains incomplete, I report that limitation separately rather than treating the original pass as broad assurance.",
      "practice": "Design confirmation and regression checks for a fictional duplicate-payment fix."
    },
    {
      "title": "Reproducible defect evidence",
      "intro": "A useful defect report allows another person to understand and reproduce an observed mismatch without guessing the setup.",
      "points": [
        "Capture build, environment, user role, relevant data identifiers and exact actions. Use sanitized evidence rather than real customer information.",
        "State expected and actual outcomes separately. Attach a screenshot or request reference that demonstrates the mismatch instead of only saying it failed.",
        "Record timing and frequency for intermittent problems. Mention whether refresh, retry or another account changes the behavior."
      ],
      "q": "What if you cannot reproduce the defect consistently?",
      "a": "I preserve the evidence already observed, record the conditions and frequency, and investigate plausible dependencies such as timing or data differences. I do not invent deterministic steps. An intermittent financial mismatch can still be significant even while its triggering condition is being narrowed down.",
      "practice": "Write a defect report for an intermittently missing invoice with enough detail for another tester."
    },
    {
      "title": "Defect triage and evidence-based discussion",
      "intro": "Triage aligns people on impact, urgency, ownership and the next action for an issue.",
      "points": [
        "Bring the affected business journey and realistic scope, such as whether all refunds fail or only one unusual configuration is affected.",
        "Separate technical uncertainty from customer impact. A workaround might reduce urgency but can still be slow, risky or unavailable to some users.",
        "Record the decision and rationale, including deferred risk and the responsible owner. Revisit it when new evidence changes the impact assessment."
      ],
      "q": "How do you handle disagreement about a defect?",
      "a": "I return to the expected behavior and observable consequences, then seek the appropriate business decision if the requirement is ambiguous. My aim is to make risk clear, not win a label debate. If a decision is to defer, its conditions and accountability should remain visible.",
      "practice": "Prepare a two-minute triage summary for a fictional document-generation failure."
    },
    {
      "title": "User acceptance testing with business users",
      "intro": "UAT asks whether the delivered capability supports the users’ intended work under agreed business conditions.",
      "points": [
        "Prepare realistic journeys with business representatives, including exceptions they actually handle. Avoid a script consisting only of happy-path clicks.",
        "Arrange safe data, access and environment readiness before the session. Users should spend time evaluating behavior instead of waiting for setup.",
        "Record observations, acceptance decisions and unresolved concerns. Distinguish training needs from software defects without dismissing either category."
      ],
      "q": "What is a tester’s role during UAT?",
      "a": "I help turn business goals into clear scenarios, prepare data and evidence, and support investigation when users encounter problems. Business acceptance remains with the authorized stakeholders. I make the conditions of the decision visible, including open issues or scenarios that could not be completed.",
      "practice": "Outline a UAT session for a fictional claims payment process with three business exceptions."
    },
    {
      "title": "Keyboard-only accessibility checks",
      "intro": "Keyboard operation is essential for people who cannot use a pointing device and deserves deliberate manual coverage.",
      "points": [
        "Complete a fictional claim-intake journey using the keyboard. Confirm all relevant controls can be reached and operated without a mouse.",
        "Observe focus through menus, dialogs and validation. Losing your place after a dialog closes can make a task unnecessarily difficult.",
        "Record the browser, page and precise interaction when reporting an issue. Automated scans alone cannot establish that the full task is operable."
      ],
      "q": "How would you test a custom date picker?",
      "a": "I would attempt to enter or choose the required date using the supported keyboard interaction, move away from the control and complete the form. I would also inspect focus behavior and compare the persisted date with the value intended. Merely tabbing onto the icon is insufficient.",
      "practice": "Complete a sample form without a mouse and document every blocked or confusing interaction.",
      "source": [
        "W3C · Keyboard accessibility",
        "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html"
      ]
    },
    {
      "title": "Accessible validation and error recovery",
      "intro": "When a form detects an input error, users need to know which item failed and what was wrong.",
      "points": [
        "Submit a fictional payment form with a missing amount and invalid date. Confirm each detected error is identified in text rather than color alone.",
        "Check that correcting one field does not erase unrelated valid information. A recovery path should preserve the user’s progress where the requirements allow.",
        "Review technical codes and vague messages such as invalid input. They may leave users unable to decide what correction to make."
      ],
      "q": "Is a red border enough to identify an error?",
      "a": "No. A user may not perceive the color or understand what it means. I check for a textual description tied to the offending input and then test whether the user can recover. Other accessibility criteria may add further requirements beyond this particular error-identification check.",
      "practice": "Evaluate three error messages from a fictional registration form and rewrite them clearly.",
      "source": [
        "W3C · Error identification",
        "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html"
      ]
    },
    {
      "title": "Zoom, reflow and readable layouts",
      "intro": "Content must remain usable when readers enlarge it or use a narrow viewport; visual checks should include real tasks.",
      "points": [
        "Enlarge a fictional policy summary and inspect paragraphs, labels and action controls. Look for clipping, overlap or content that becomes unreachable.",
        "Distinguish ordinary reading content from components whose meaning needs two-dimensional layout, such as some tables. Evaluate exceptions carefully.",
        "Test a long address and long translated label as well as short sample text. Convenient demo data can hide layout failures."
      ],
      "q": "Why check zoom if the page already supports mobile screens?",
      "a": "Responsive layouts and browser zoom can expose different combinations of text size and available space. I verify that the user can still understand the content and complete the task under the relevant accessibility requirements rather than assuming one screenshot proves both cases.",
      "practice": "Inspect a fictional invoice page at enlarged text and narrow width; record any lost information.",
      "source": [
        "W3C · Reflow",
        "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html"
      ]
    },
    {
      "title": "Cross-browser and device coverage",
      "intro": "Compatibility planning selects environments based on supported platforms, usage and the consequences of a failure.",
      "points": [
        "Create an explicit support matrix with browser versions, operating systems and key device characteristics. Avoid the untestable promise that everything works everywhere.",
        "Use critical journeys across the matrix and target rendering-sensitive features such as uploads, date inputs, printing and downloads.",
        "When results differ, record the exact environment and distinguish application defects from unsupported combinations. Preserve evidence before changing browser settings."
      ],
      "q": "Should every case run on every browser?",
      "a": "Not necessarily. I use risk and evidence to choose broad coverage for critical journeys and focused coverage for platform-sensitive behavior. Shared logic may receive deeper testing elsewhere. The selected matrix, exclusions and remaining compatibility risks should be visible to the release decision maker.",
      "practice": "Plan a compact browser matrix for a fictional customer portal with heavy mobile usage."
    },
    {
      "title": "Localization and business formatting",
      "intro": "Localization testing examines whether language and regional presentation preserve the intended meaning of the business transaction.",
      "points": [
        "Use ambiguous dates such as 04/05 and confirm the displayed convention and persisted meaning. Check whether the interface makes that convention clear.",
        "Inspect currencies, decimal separators and grouping separately. A currency symbol by itself may not uniquely identify the monetary unit.",
        "Try long names, accented characters and translated messages. Verify that export files and generated documents remain consistent with the application."
      ],
      "q": "What is a high-impact localization failure?",
      "a": "A payment amount or coverage date interpreted differently from what the user entered can have serious business effects. I prioritize semantic correctness before cosmetic wording and compare both display and storage. I also use approved translations or business review rather than judging unfamiliar language by appearance.",
      "practice": "Create six regional-format cases for a fictional payment and policy-date form."
    },
    {
      "title": "Session interruption and unsaved work",
      "intro": "Real users experience timeouts, navigation mistakes and interrupted connections; tests should examine what happens to their work.",
      "points": [
        "Populate a fictional claim form, then refresh, navigate back or allow the session to expire. Observe warnings, recovery and saved state.",
        "Interrupt a submit request in an authorized test environment and inspect the actual record before retrying. An uncertain response does not prove nothing was saved.",
        "Repeat with sensitive fields and multiple browser tabs. Confirm that recovery does not expose another user’s data or overwrite newer work."
      ],
      "q": "What should happen after a session expires?",
      "a": "The expected behavior must come from the application’s security and usability requirements. I check that protected actions require valid authentication and that any supported recovery preserves correct ownership and data integrity. I would not assume that silently restoring every field is appropriate for every kind of information.",
      "practice": "Design an interruption scenario that distinguishes an unsaved draft from a submitted transaction."
    },
    {
      "title": "Test data planning and privacy",
      "intro": "Good test data is purposeful, reproducible and safe to use in the environment where testing occurs.",
      "points": [
        "Define data conditions from the scenario: a policy nearing expiry, a partially paid invoice or a customer with several contact methods.",
        "Use synthetic or appropriately approved masked records. Preserve relationships and valid formats without copying unnecessary personal information into screenshots or tickets.",
        "Track ownership, reset rules and expiry for shared data. Two testers changing the same invoice can create failures unrelated to the feature."
      ],
      "q": "How do you avoid tests depending on one shared account?",
      "a": "I create or allocate scenario-specific records with known preconditions and record their identifiers. Where shared fixtures are unavoidable, I document what may change and how to restore them. The aim is to make the test repeatable without concealing real state transitions behind arbitrary cleanup.",
      "practice": "Create a data checklist for five fictional billing scenarios, including reset and ownership rules."
    },
    {
      "title": "Estimation with visible assumptions",
      "intro": "Test estimates are more useful when they expose scope, dependencies and uncertainty than when they present a single unexplained number.",
      "points": [
        "Break work into analysis, data preparation, environment setup, execution, investigation and reporting. Include retesting effort rather than estimating only clicks.",
        "Identify uncertain integrations or missing requirements and give a range where appropriate. State the assumptions that would change the estimate.",
        "Compare actual effort with the estimate after delivery. Use differences to improve future planning instead of treating them only as individual performance failures."
      ],
      "q": "How would you estimate an unfamiliar feature?",
      "a": "I first examine the business flows and dependencies, ask for a walkthrough and identify high-risk unknowns. A small investigation can reduce uncertainty before committing to a narrower range. I explain which parts of the estimate are evidence-based and which depend on conditions outside the test team’s control.",
      "practice": "Estimate a fictional refund feature with three assumptions and two possible blockers."
    },
    {
      "title": "Risk registers and residual risk",
      "intro": "A risk register makes possible failures, their impact and planned investigation visible so testing effort can be justified.",
      "points": [
        "Describe a specific failure such as duplicate refund issuance, including who is affected and which business control could prevent or detect it.",
        "Rank likelihood and impact using the team’s agreed method. Reassess rankings when architecture, usage or observed defects change the evidence.",
        "Record remaining exposure after testing and mitigation. A passed scenario reduces uncertainty about that scenario; it does not erase every related risk."
      ],
      "q": "What is residual risk in a release discussion?",
      "a": "It is the risk remaining after the chosen controls and testing. For example, a payment journey may pass while a third-party outage scenario remains untested. I describe that limitation and its potential impact so authorized stakeholders can decide with evidence rather than a simple pass percentage.",
      "practice": "Write a three-item risk register for a fictional bank-payment integration with mitigation and remaining exposure."
    },
    {
      "title": "Test reporting that supports decisions",
      "intro": "A test report should help readers understand demonstrated behavior, unresolved problems and the confidence limits of the evidence.",
      "points": [
        "State scope, build and environment, then summarize meaningful outcomes. Separate failed, blocked and unexecuted cases because they imply different next actions.",
        "Connect serious defects to affected business journeys. A total defect count alone does not show whether customers can complete essential tasks.",
        "Explain coverage gaps and data limitations plainly. Include the owner or planned action for unresolved items when that information is known."
      ],
      "q": "Why can a high pass percentage be misleading?",
      "a": "The denominator may omit important scenarios or contain many easy checks. I would look at risk coverage, blocked work and the severity of unresolved failures. A release with ninety-nine passing cosmetic checks and one failed payment control can still have unacceptable business exposure.",
      "practice": "Write a short release test report with one blocker, one accepted defect and one untested risk."
    },
    {
      "title": "Retrospectives and measurable improvement",
      "intro": "A retrospective is useful when observations become a small, testable improvement in how the team works.",
      "points": [
        "Bring evidence such as repeated data setup delays or defects caused by ambiguous dates. Describe the system of work instead of blaming individuals.",
        "Choose a concrete experiment, owner and review point. For example, prepare reusable synthetic data before the next feature enters execution.",
        "Check whether the experiment helped and adjust it. Adding a checklist that nobody uses is not the same as improving outcomes."
      ],
      "q": "What improvement would you suggest after repeated late defects?",
      "a": "I would inspect where those defects could have been noticed earlier and propose a focused change, such as reviewing business examples during refinement. I would then observe whether similar ambiguity defects decrease. The action should address the demonstrated cause rather than simply demand more testing effort.",
      "practice": "Write one retrospective observation, one experiment and one measure of success for a fictional team.",
      "source": [
        "Scrum Guides · The Scrum Guide",
        "https://scrumguides.org/scrum-guide.html"
      ]
    }
  ],
  "database": [
    {
      "title": "Row grain and business identifiers",
      "intro": "A table’s grain tells you what one row represents. Establish that meaning before counting rows or comparing amounts.",
      "points": [
        "An invoice header represents an invoice, while an invoice line represents an individual billed item. Both can carry the same invoice number.",
        "Write down the business key at each grain. A term number alone may repeat across policies, requiring a composite identifier.",
        "Build a sample with one invoice and three lines. Verify the expected header count, line count and monetary total separately."
      ],
      "q": "Why can two correct tables contain different numbers of rows?",
      "a": "Their grains may differ. I compare data at the agreed business level and explain any transformation that splits, combines or filters records. Treating every difference in row count as a defect can send investigation in the wrong direction.",
      "practice": "Describe the grain and candidate key of a fictional policy, term and charge table.",
      "source": [
        "PostgreSQL · Constraints",
        "https://www.postgresql.org/docs/current/ddl-constraints.html"
      ]
    },
    {
      "title": "Join multiplication and inflated totals",
      "intro": "Joining two child tables can multiply rows and inflate a summary even when each source table is correct.",
      "points": [
        "A fictional invoice with two charges and three payments produces six combinations if both sets are joined only through the header.",
        "Calculate charge and payment totals independently at invoice grain before joining the summaries. Retain counts so unexpected multiplicity stays visible.",
        "Use uneven amounts in your fixture. Repeated identical values make it harder to see which rows were counted more than once."
      ],
      "q": "Does adding DISTINCT reliably fix an inflated sum?",
      "a": "No. Separate legitimate charges may share the same amount. Removing equal values would discard real financial events. I inspect the join cardinality and restructure the query to preserve each event exactly once at the intended grain.",
      "practice": "Calculate expected totals for two charges of 25 and three payments of 10 on one invoice.",
      "source": [
        "PostgreSQL · Table expressions",
        "https://www.postgresql.org/docs/current/queries-table-expressions.html"
      ]
    },
    {
      "title": "Outer joins and predicate placement",
      "intro": "An outer join can preserve unmatched records, but the placement of a filter can change which rows survive.",
      "points": [
        "Suppose a report must show every policy and any open claim. Put the open-claim condition in the join if policies with none must remain.",
        "Add policies with no claims, only closed claims and several open claims. These fixtures distinguish missing parents from legitimate repeated detail.",
        "Inspect null child keys explicitly. An unmatched relationship differs from a matched claim whose optional description happens to be missing."
      ],
      "q": "What if the open-status condition is moved into WHERE?",
      "a": "For this example an unmatched row has no child status and fails the filter. Policies with no matching open claim disappear. I would compare the report requirement with both query outputs before calling the missing policies a source-data problem.",
      "practice": "Predict the output rows for three policies with zero, one closed and two open claims respectively.",
      "source": [
        "PostgreSQL · Table expressions",
        "https://www.postgresql.org/docs/current/queries-table-expressions.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT p.id, c.id AS open_claim\nFROM policy p LEFT JOIN claim c\nON c.policy_id = p.id AND c.status = 'open';",
      "language": "SQL"
    },
    {
      "title": "Missing records with an anti-join",
      "intro": "An anti-join identifies source records that have no matching target key. It helps pinpoint exactly what a load omitted.",
      "points": [
        "Compare the eligible source population and target snapshot at the same cutoff. Different load windows produce misleading missing-record lists.",
        "Use NOT EXISTS with the complete business key. Include tenant or policy term when identifiers repeat across contexts.",
        "Run the comparison in reverse to find unexpected target records. Check duplicate counts separately because existence checks alone do not measure multiplicity."
      ],
      "q": "Why can NOT IN return surprising results?",
      "a": "If its subquery includes a null, SQL’s three-valued logic can cause otherwise unmatched comparisons to evaluate as unknown. I choose an explicitly correlated existence check and define how null source keys should be routed under the mapping contract.",
      "practice": "Identify missing invoice IDs across two fictional snapshots and explain what happens to a null source ID.",
      "source": [
        "PostgreSQL · Subquery expressions",
        "https://www.postgresql.org/docs/current/functions-subquery.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT s.invoice_id FROM src_invoice s\nWHERE NOT EXISTS (SELECT 1 FROM dst_invoice t\n                  WHERE t.invoice_id = s.invoice_id);",
      "language": "SQL"
    },
    {
      "title": "NULL-safe field comparison",
      "intro": "Missing values require deliberate handling when comparing source and target records. Ordinary equality can leave a difference undetected.",
      "points": [
        "In PostgreSQL, IS DISTINCT FROM compares values while treating two nulls as equal and a null versus a value as different.",
        "Keep empty text, whitespace, zero and null distinct unless the transformation explicitly normalizes them. Create a fixture for each accepted representation.",
        "Compare matched keys first and investigate missing keys separately. A comparison of shared rows cannot by itself establish completeness."
      ],
      "q": "How would you detect an unexpectedly cleared email?",
      "a": "I join on the verified customer key and use a null-safe comparison for the email field. Then I check the mapping rule for trimming or masking before labeling the difference incorrect. An empty expected value requires the same careful comparison as a populated one.",
      "practice": "Predict results for null/null, null/empty and empty/empty pairs using the sample predicate.",
      "source": [
        "PostgreSQL · Comparison predicates",
        "https://www.postgresql.org/docs/current/functions-comparison.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT s.id FROM src_contact s JOIN dst_contact t USING (id)\nWHERE s.email IS DISTINCT FROM t.email;",
      "language": "SQL"
    },
    {
      "title": "Counts, nullable fields and group checks",
      "intro": "Counts answer different questions depending on whether the expression represents rows, populated values or distinct identifiers.",
      "points": [
        "COUNT(*) counts rows. COUNT(reference) counts rows with a populated reference. Their difference reveals the number of missing references in that population.",
        "Group by batch, status and currency to locate imbalances hidden in a grand total. Verify groups with zero eligible records separately.",
        "Compare distinct business keys with total rows to flag possible duplication. Investigate the intended grain before declaring extra occurrences incorrect."
      ],
      "q": "How could two batches each have 100 rows yet disagree?",
      "a": "One batch could contain a duplicate key and omit another, or contain different null rates or amounts. I combine counts with key-level comparisons, grouped totals and business rules. Counts alone tell me how many rows were observed, not which events they represent.",
      "practice": "Build a four-row fixture with one missing reference and one repeated reference, then predict three counts.",
      "source": [
        "PostgreSQL · Aggregate functions",
        "https://www.postgresql.org/docs/current/functions-aggregate.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT count(*) AS rows_seen, count(ref) AS populated,\n       count(DISTINCT ref) AS different_refs FROM payment;",
      "language": "SQL"
    },
    {
      "title": "Primary, unique and foreign keys",
      "intro": "Database constraints protect different parts of record identity and relationships. QA should exercise both valid records and rejected combinations.",
      "points": [
        "A primary key identifies each row. A business identifier may also need a unique constraint even when the table uses a separate generated key.",
        "A foreign key connects a child reference to an eligible parent. Verify optionality separately because a nullable relationship may legitimately have no parent.",
        "Try two terms sharing one policy number and a duplicate within the same term. A correctly scoped composite constraint can distinguish these cases."
      ],
      "q": "Does a generated primary key prevent duplicate policies?",
      "a": "It prevents duplicate values of that key. Two rows may still carry different generated IDs for the same business policy. I verify the business uniqueness rule, including jurisdiction or term where applicable, independently from the technical row identifier.",
      "practice": "Design a fictional parent-child fixture with one acceptable missing reference and one invalid non-null reference.",
      "source": [
        "PostgreSQL · Constraints",
        "https://www.postgresql.org/docs/current/ddl-constraints.html"
      ]
    },
    {
      "title": "Ranking and deterministic latest rows",
      "intro": "Window functions can rank records within a business key while retaining the individual rows needed for investigation.",
      "points": [
        "Partition fictional policy events by policy ID and order by event time. Use a stable tie-breaker when the contract specifies one.",
        "Design two events with the same timestamp. An arbitrary second sort key is reproducible but can still be wrong if it contradicts business precedence.",
        "Keep the ranked intermediate result available during debugging. Inspect both winner and runner-up when a report picks an unexpected latest status."
      ],
      "q": "Is the highest generated ID always the latest business event?",
      "a": "No. Loading sequence and business event sequence can differ, especially during replay. I use the agreed order and ask for a precedence rule when equal timestamps are possible. Without that rule, the expected latest result may be ambiguous.",
      "practice": "Rank a fictional policy’s events by time and sequence, then identify the selected record.",
      "source": [
        "PostgreSQL · Window functions",
        "https://www.postgresql.org/docs/current/tutorial-window.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT policy_id, status, row_number() OVER (\n  PARTITION BY policy_id ORDER BY event_at DESC, sequence_no DESC\n) AS position FROM policy_event;",
      "language": "SQL"
    },
    {
      "title": "Running balances with explicit ordering",
      "intro": "A running balance accumulates signed movements for one account in a defined order. The final total alone cannot expose every sequencing defect.",
      "points": [
        "Use a fixture with opening balance zero, a debit of 100 and a credit of 30. State the sign convention before predicting 100 and 70.",
        "Include movements with the same effective timestamp. Supply the approved ordering key and a row-based window frame for event-by-event balances.",
        "Partition by account and currency when balances are separate. A movement in another currency must not silently affect the first account’s subtotal."
      ],
      "q": "Why can the closing balance match while a statement is wrong?",
      "a": "The movements may appear in the wrong order or be attributed to the wrong dates. I check each intermediate balance against the chronological event ledger and confirm how ties and reversals are represented.",
      "practice": "Calculate the balance after every movement in a four-event fictional account ledger.",
      "source": [
        "PostgreSQL · Window functions",
        "https://www.postgresql.org/docs/current/tutorial-window.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT account_id, event_id, sum(amount) OVER (\n  PARTITION BY account_id, currency ORDER BY posted_at, event_id\n  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS balance\nFROM ledger;",
      "language": "SQL"
    },
    {
      "title": "Transaction atomicity and rollback",
      "intro": "A transaction groups changes so that related database updates can commit together or be rolled back together.",
      "points": [
        "A fictional transfer decreases one balance and increases another. Introduce a controlled failure between updates using disposable test data.",
        "After rollback, inspect both balances and the audit records covered by the same transaction. Define separately any effects outside the database boundary.",
        "Repeat the successful path and verify that the committed changes are visible to a fresh session. Capture the identifiers used for reconciliation."
      ],
      "q": "Does a database rollback recall an email already sent?",
      "a": "No. An external side effect is outside an ordinary database transaction. I verify how the application coordinates outgoing work, and test the recovery contract separately. A ledger can roll back correctly while an external recipient still sees a message.",
      "practice": "Design one successful and one interrupted transfer with expected before-and-after balances.",
      "source": [
        "PostgreSQL · Transactions",
        "https://www.postgresql.org/docs/current/tutorial-transactions.html"
      ]
    },
    {
      "title": "Concurrency and isolation experiments",
      "intro": "Isolation controls how concurrent database operations see and affect one another. A useful test fixes the order of actions across two sessions.",
      "points": [
        "Start with a balance of 100. Have two test sessions read it, then attempt overlapping updates while recording when each transaction commits.",
        "Identify the configured isolation level and update pattern before predicting an outcome. Different designs may block, reject or serialize conflicting work.",
        "Capture both transaction results and the final committed balance. A user-visible success message from each session does not establish correctness."
      ],
      "q": "What evidence would you collect for a lost update?",
      "a": "I need the initial value, each session’s read and write order, isolation settings, commit or error responses and final value. I compare that sequence with the intended concurrency rule and distinguish a retryable conflict from silent loss of a committed change.",
      "practice": "Write a two-session timetable for concurrent edits to the same fictional claim reserve.",
      "source": [
        "PostgreSQL · Transaction isolation",
        "https://www.postgresql.org/docs/current/transaction-iso.html"
      ]
    },
    {
      "title": "Decimal precision and rounding stages",
      "intro": "Financial comparisons need an explicit unit, scale and rounding rule at every transformation boundary.",
      "points": [
        "Create fractional line amounts where rounding each line differs from rounding the total. Decide which result the approved mapping requires.",
        "Use exact decimal types for exact-value fixtures where appropriate. Floating-point approximations can make direct comparisons misleading for monetary values.",
        "Test positive and negative amounts, maximum precision and multiple currencies. Avoid a universal tolerance that conceals a real cent-level discrepancy."
      ],
      "q": "Why can three lines disagree with their invoice total by a cent?",
      "a": "The calculation may round at a different stage from the expected result. I reconstruct the unrounded inputs and each specified rounding step, then inspect the stored values and display formatting. The business rule determines whether the cent difference is expected or defective.",
      "practice": "Compare rounding three fictional 0.335 line amounts individually with rounding their sum under one stated tie rule.",
      "source": [
        "PostgreSQL · Numeric types",
        "https://www.postgresql.org/docs/current/datatype-numeric.html"
      ]
    },
    {
      "title": "Time zones and business cutoffs",
      "intro": "Event timestamps, business dates and load dates answer different questions. Convert between them only under a defined time-zone contract.",
      "points": [
        "An event near midnight UTC may belong to the previous local business day. Check the agreed reporting zone before assigning a partition.",
        "Use timestamps around daylight-saving changes where the supported zone observes them. Confirm how ambiguous or nonexistent local times are captured.",
        "Prefer precisely stated half-open reporting intervals when that is the contract. Include events exactly at both boundaries to expose overlaps or gaps."
      ],
      "q": "How can the same event land in two daily reports?",
      "a": "Adjacent report filters can both include their shared midnight cutoff, or independent components can interpret local time differently. I compare the normalized timestamp and interval rules for both runs and verify the event is assigned once to its intended business period.",
      "practice": "Assign three UTC events around midnight to local business dates in a named reporting zone.",
      "source": [
        "PostgreSQL · Date and time types",
        "https://www.postgresql.org/docs/current/datatype-datetime.html"
      ]
    },
    {
      "title": "Watermarks and equal timestamps",
      "intro": "A watermark records progress through a changing source. Rows at exactly the previous cutoff deserve explicit test coverage.",
      "points": [
        "Create several source records with the same modification timestamp and interrupt extraction between them. A timestamp-only restart can skip remaining records.",
        "Define the tie strategy, such as a stable secondary key or a controlled overlap with deduplication. Verify the approach against the actual source guarantees.",
        "Advance the checkpoint only under the pipeline’s documented success conditions. Test a write that succeeds immediately before the checkpoint update fails."
      ],
      "q": "Can a tie-breaker solve late updates with old timestamps?",
      "a": "Only if the source ordering guarantees cover them. A newly arrived row with an older modification value may fall behind the entire watermark. I test the pipeline’s late-data policy separately and reconcile by business key to detect rows that the incremental predicate never selects.",
      "practice": "Sketch two consecutive load windows containing three equal-timestamp records and one late arrival.",
      "source": [
        "Microsoft · Incremental data loading",
        "https://learn.microsoft.com/en-us/azure/data-factory/tutorial-incremental-copy-overview"
      ]
    },
    {
      "title": "Change data capture and replay",
      "intro": "Change data capture conveys source changes so a downstream consumer can update its own representation.",
      "points": [
        "Create, update and delete a fictional contact in known sequence. Predict which values and operation types the consumer receives under its capture contract.",
        "Restart the consumer near a checkpoint. Check whether an already processed change can be delivered again and whether applying it twice changes the result.",
        "Track source position and transaction boundaries where available. A later arrival time alone does not establish the order in which source changes committed."
      ],
      "q": "How do you investigate a missing delete downstream?",
      "a": "I locate the source change, inspect the captured operation and progress position, then trace consumer handling and the destination’s delete policy. The target may legitimately mark a row inactive instead of physically removing it, so the expected representation must be explicit.",
      "practice": "Design a replay test for a fictional insert, two updates and a delete.",
      "source": [
        "PostgreSQL · Logical decoding concepts",
        "https://www.postgresql.org/docs/current/logicaldecoding-explanation.html"
      ]
    },
    {
      "title": "Idempotent upserts and event identity",
      "intro": "An upsert may insert a new row or update an existing one. Safe replay depends on choosing the correct conflict key and update rule.",
      "points": [
        "Load the same fictional payment event twice. Verify that its business effect remains one payment and that an unrelated event with the same amount still survives.",
        "Deliver an older version after a newer one. Test the agreed precedence rule so replay does not replace fresh information with stale state.",
        "Compare business columns and any intentional audit changes separately. A different ingestion timestamp does not necessarily represent a second financial event."
      ],
      "q": "Does ON CONFLICT automatically make a load idempotent?",
      "a": "No. An update that increments an amount on each conflict will change the total on replay. The unique key, conflict handling and assigned values must together represent the desired repeatable effect. I test the target result after a deliberate second execution.",
      "practice": "Predict the outcome of replaying a snapshot assignment versus an additive balance update.",
      "source": [
        "PostgreSQL · INSERT",
        "https://www.postgresql.org/docs/current/sql-insert.html"
      ]
    },
    {
      "title": "Type 2 dimension intervals",
      "intro": "A Type 2 dimension preserves selected attribute changes in separate versions. Each version should support the intended point-in-time interpretation.",
      "points": [
        "Create a producer who changes region on July 1. Verify that June and July facts map to the appropriate versions of that producer.",
        "Check the effective interval convention and current-row indicator. Test dates exactly at the boundary to find overlaps or unintended gaps.",
        "Repeat the same unchanged input and verify whether the contract expects another version. Unnecessary history rows can complicate joins and reporting."
      ],
      "q": "How can every fact join successfully yet history still be wrong?",
      "a": "A join using only the producer business key may attach both historical versions, or a join using the current flag may restate June under the July region. I verify both the match count and the version selected as of each fact’s business date.",
      "practice": "Create a two-version timeline and identify the expected version for three dated facts.",
      "source": [
        "Kimball Group · Type 2 dimension changes",
        "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-2/"
      ]
    },
    {
      "title": "Late-arriving facts and effective joins",
      "intro": "A fact can arrive after the dimension information relevant to its original business date has changed.",
      "points": [
        "Use an August load containing a June payment for a producer who moved regions in July. Determine the dimension version valid in June.",
        "Test a fact whose dimension record is unavailable at load time. Agree whether to hold, reject or attach a designated placeholder, then validate subsequent correction.",
        "Compare reports before and after late arrival. Verify that the intended historical period is restated and current-period totals remain correctly attributed."
      ],
      "q": "Why is the latest dimension key unsafe for a late fact?",
      "a": "It can describe the entity as it looks today instead of as it was when the event occurred. I select according to the mapping’s effective-date rule and verify one unambiguous matching version. Processing date remains available for operational tracking.",
      "practice": "Model one late payment and show the difference between event-month and load-month reporting.",
      "source": [
        "Kimball Group · Late-arriving facts",
        "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/late-arriving-fact/"
      ]
    },
    {
      "title": "Soft deletion and active population",
      "intro": "Deletion semantics differ between systems. A target can preserve a historical row while excluding it from the active business population.",
      "points": [
        "Delete one fictional contact upstream and retain another with a similar name. Trace the business key through the mapping and inspect both target records.",
        "Specify expected handling of dependent rows and history. A soft-deleted parent may remain queryable for audit while disappearing from operational searches.",
        "Test reactivation or recreation with the same business identifier. Decide whether the contract expects a new version, restored record or new identity."
      ],
      "q": "Why is matching raw row count insufficient after a delete?",
      "a": "The source may physically remove a record while the target intentionally retains an inactive version. I compare active populations and historical populations separately, including deletion timestamps or status flags where required. This separates an intentional retention policy from an accidentally missed delete.",
      "practice": "Write expected active and historical totals before and after one deletion and one reactivation.",
      "source": [
        "Debezium · Handling delete events",
        "https://debezium.io/documentation/reference/stable/transformations/event-flattening.html"
      ]
    },
    {
      "title": "Reject handling and quarantine",
      "intro": "A pipeline needs a clear outcome for invalid records so operators can recover them without losing evidence.",
      "points": [
        "Send a small batch containing one valid invoice and one invalid currency. Verify the documented whole-batch or individual-row handling rule.",
        "Inspect the rejected record’s identifier, reason and batch context. Restrict sensitive payload details to the approved operational audience.",
        "Correct and resubmit the rejected row using the supported recovery path. Confirm the successful original record is not loaded a second time."
      ],
      "q": "What is the difference between a rejected row and a dropped row?",
      "a": "A rejected row has an identifiable outcome that can be reconciled and addressed under the pipeline contract. A dropped row disappears without the expected evidence. I compare source eligibility, accepted records and documented exclusions so the operator can account for each input.",
      "practice": "Design a three-row rejection fixture with expected accepted, rejected and skipped outcomes.",
      "source": [
        "Databricks · Pipeline expectations",
        "https://docs.databricks.com/aws/en/ldp/expectations"
      ]
    },
    {
      "title": "Schema changes and column compatibility",
      "intro": "A source can change structure while still delivering syntactically valid files or query results. Tests should protect the mapping contract.",
      "points": [
        "Add an optional column, reorder fields and widen a text value in separate fixtures. Confirm which changes the consumer is designed to tolerate.",
        "Rename a required column or change its type. Check whether the load fails visibly, quarantines affected rows or uses an agreed fallback.",
        "Inspect existing target columns after each change. A position-based mapping can silently place an address in a name column while row counts remain correct."
      ],
      "q": "How do you detect a silent column swap?",
      "a": "I use distinctive sentinel values in neighboring columns and assert their target destinations. Header checks and data-type checks help, but two text columns can pass both while being transposed. The field-level expected values reveal the corruption.",
      "practice": "Create a fictional source file where two same-typed fields exchange positions and predict the correct response.",
      "source": [
        "Databricks · Schema enforcement",
        "https://docs.databricks.com/aws/en/tables/schema-enforcement"
      ]
    },
    {
      "title": "Reference mappings and unknown codes",
      "intro": "Code translations turn source classifications into target classifications. Their completeness and effective dates affect downstream reporting.",
      "points": [
        "Give each supported source status a representative record and verify its target value. Include multiple source codes that legitimately map to one category.",
        "Add an unknown code and an expired mapping. Verify the agreed rejection, default or escalation behavior rather than silently assuming a substitute.",
        "Check for duplicate active mappings for the same source key. One input record matching two translation rows can duplicate facts downstream."
      ],
      "q": "What if a report suddenly shows a large Other category?",
      "a": "I inspect the contributing source codes, recent mapping changes and fallback behavior. A new source value might be routed to a permitted default, but the business still needs to know whether that classification preserves reporting meaning. I compare affected counts across mapping versions.",
      "practice": "Test a fictional three-code translation table with one unknown and one overlapping effective date.",
      "source": [
        "Microsoft · Lookup transformations",
        "https://learn.microsoft.com/en-us/azure/data-factory/data-flow-lookup"
      ]
    },
    {
      "title": "Batch identity and lineage",
      "intro": "Lineage explains how a target row was produced, while batch metadata identifies the execution and inputs involved.",
      "points": [
        "Choose a fictional invoice from a report and trace its target key, source identifier, transformation version and batch membership where the design exposes them.",
        "Separate business event identity from execution identity. Reprocessing the same input may create a new run record while preserving one logical result.",
        "Test partial failure and replay. Operators should be able to identify which input was used and which target population is complete."
      ],
      "q": "Why is a load timestamp alone weak lineage evidence?",
      "a": "Many records can share it, and it may reveal neither source origin nor transformation version. I look for documented identifiers that connect an output to the correct input and run, then verify those references remain meaningful after retry or backfill.",
      "practice": "Trace one fictional reporting discrepancy through a source file, staging batch and target record.",
      "source": [
        "OpenLineage · Object model",
        "https://openlineage.io/docs/spec/object-model/"
      ]
    },
    {
      "title": "Partial failure and restart checkpoints",
      "intro": "A restart test examines the boundary between durable output and recorded progress after interruption.",
      "points": [
        "Stop a controlled test run after the first target partition commits but before later partitions are written. Record exactly which objects became visible.",
        "Restart by the supported procedure and compare the complete final population with a clean uninterrupted run using the same input snapshot.",
        "Inspect alerts, batch status and publication rules. A partial dataset may be acceptable in staging but should not appear complete to downstream readers."
      ],
      "q": "What if a job reports failure after all target writes committed?",
      "a": "A blind replay might duplicate business events. I examine the checkpoint and durable target state, then test the recovery contract against that combination. Correct recovery should produce the agreed logical output and retain enough run evidence to diagnose the interruption.",
      "practice": "Draw three possible failure points around extraction, target commit and checkpoint persistence.",
      "source": [
        "Microsoft · Incremental data loading",
        "https://learn.microsoft.com/en-us/azure/data-factory/tutorial-incremental-copy-overview"
      ]
    },
    {
      "title": "Partition reconciliation and offsetting errors",
      "intro": "Partitioned totals can expose errors hidden by a matching global count or sum. Choose dimensions that track meaningful business differences.",
      "points": [
        "Move 100 from one fictional currency bucket into another while keeping the combined numeric total unchanged. Grouped reconciliation should reveal both discrepancies.",
        "Use a consistent cutoff, grain and eligibility rule on both sides. Compare counts, key populations and signed totals within each relevant group.",
        "Investigate small mismatches at row level. Large buckets can contain offsetting missing and duplicate amounts even when their aggregate matches."
      ],
      "q": "Can equal grand totals prove every account reconciles?",
      "a": "No. One account could be overstated by the same amount another is understated. I group by the dimensions that determine business ownership and monetary meaning, then compare keys and individual movements for groups that merit deeper investigation.",
      "practice": "Build a six-row sample where regional totals disagree but the overall total matches.",
      "source": [
        "PostgreSQL · Aggregate functions",
        "https://www.postgresql.org/docs/current/functions-aggregate.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nSELECT currency, region, count(*) AS n, sum(amount) AS total\nFROM payment_fact GROUP BY currency, region;",
      "language": "SQL"
    },
    {
      "title": "Backfills and bounded restatement",
      "intro": "A backfill recalculates previously processed data. Its scope, input versions and interaction with ordinary loads must be defined.",
      "points": [
        "Choose one fictional month and seed an unchanged neighbor month. Verify intended corrections inside the window and stable records outside it.",
        "Record transformation and reference-data versions. Recomputing history with today’s mappings can change totals even if the historical input file is identical.",
        "Run the backfill twice and compare business keys, values and downstream reports. Check how overlapping scheduled loads are coordinated under the design."
      ],
      "q": "How would you prove a backfill changed only its intended scope?",
      "a": "I compare before-and-after snapshots by partition and business key, investigate every unexpected change outside the window and reconcile corrected groups against independently derived expectations. A matching overall count does not identify which historical facts were actually restated.",
      "practice": "Design a June-only repair with a May record, a June record and a July record.",
      "source": [
        "Apache Airflow · Backfill",
        "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/backfill.html"
      ]
    },
    {
      "title": "Query plans and diagnostic performance",
      "intro": "A query plan helps explain how a database expects to retrieve and combine data. It is evidence for investigation, not an automatic verdict.",
      "points": [
        "Use a fictional account search with selective and broad filters. Compare estimated rows and plan choices against the actual test population.",
        "EXPLAIN shows the proposed plan. EXPLAIN ANALYZE executes the statement, so choose an authorized, safe query and understand its effects before using it.",
        "Capture representative data size, statistics and conditions. A plan from a tiny fixture may differ substantially from production-like behavior."
      ],
      "q": "Is a sequential scan always a defect?",
      "a": "No. Scanning a small table or a large fraction of its rows may be appropriate. I assess measured workload goals, selectivity and actual resource use, then investigate whether estimates or indexes explain the observed delay. Correct output must also remain intact.",
      "practice": "Compare the plan for one account lookup with a report reading most accounts in a test database.",
      "source": [
        "PostgreSQL · Using EXPLAIN",
        "https://www.postgresql.org/docs/current/using-explain.html"
      ],
      "code": "-- Fictional training schema (PostgreSQL)\nEXPLAIN SELECT invoice_id, balance FROM invoice\nWHERE account_id = 4102;",
      "language": "SQL"
    }
  ],
  "git": [
    {
      "title": "Selective staging and focused commits",
      "intro": "Staging selected changes helps separate a test fix from unrelated work in the same file.",
      "points": [
        "Review individual hunks before staging them, especially when formatting and logic changes are mixed together.",
        "After selective staging, check whether the staged version remains coherent. Splitting dependent changes can create a broken intermediate commit.",
        "Keep unrelated generated output outside the commit. A small diff is useful only if it contains all required supporting changes."
      ],
      "q": "When would you stage only part of a file?",
      "a": "When independent changes belong to different purposes. I would separate a locator correction from an unrelated refactor, inspect the staged diff and verify the selected snapshot is meaningful. I would not split tightly coupled changes merely to make the commit appear smaller.",
      "practice": "Identify two independent edits and explain what must remain together in each commit.",
      "source": [
        "Git · git-add",
        "https://git-scm.com/docs/git-add"
      ]
    },
    {
      "title": "Comparing working, staged and committed changes",
      "intro": "A diff is a comparison between two states, so choose those states before interpreting the output.",
      "points": [
        "Use the ordinary diff for unstaged changes and the staged comparison for the next proposed commit.",
        "Compare branches or commits when investigating an introduced defect. State the base revision explicitly in your evidence.",
        "Read changed assertions as carefully as changed production code. An updated expected value can conceal a regression."
      ],
      "q": "Why might git diff show nothing although changes are staged?",
      "a": "The ordinary working-tree comparison may be empty because those edits are already staged. I inspect the staged comparison and repository status. Before sharing a QA change, I verify both views so I do not overlook an unintended assertion or test-data modification.",
      "practice": "Review a staged test change and identify whether it strengthens or weakens the expected behavior.",
      "source": [
        "Git · git-diff",
        "https://git-scm.com/docs/git-diff"
      ]
    },
    {
      "title": "Commit history as investigation evidence",
      "intro": "History helps establish what changed and why, but it does not replace reproduction of the defect.",
      "points": [
        "Filter history by a relevant file or path to narrow investigation without losing the surrounding commit context.",
        "Read the full change and its message before attributing a failure to its author or purpose.",
        "Record immutable commit identifiers in defect evidence instead of referring only to a moving branch name."
      ],
      "q": "How do you use history when a regression appears?",
      "a": "I identify a known good and bad revision, inspect relevant changes and reproduce the behavior under comparable conditions. History provides candidates; a controlled test confirms the cause. I include the confirmed revision and environment in the defect rather than relying on a suspicious commit message.",
      "practice": "Choose a fictional failing test and list the history information needed for a useful regression report.",
      "source": [
        "Git · git-log",
        "https://git-scm.com/docs/git-log"
      ]
    },
    {
      "title": "Inspecting a specific revision without switching branches",
      "intro": "You can inspect committed content without replacing the files currently used for your work.",
      "points": [
        "Use a revision-specific inspection to examine a commit or the historical contents of a file.",
        "Compare historical test data with current data when an apparent application regression may originate in fixtures.",
        "Keep revision and path together in your notes so another engineer can reproduce the same inspection."
      ],
      "q": "How would you check an old expected result while preserving current work?",
      "a": "I would inspect the relevant file at the known revision rather than switch my entire working tree. I would compare the expected value and its surrounding explanation, then determine whether the requirement changed. I would avoid treating the old value as authoritative without checking business context.",
      "practice": "Explain how you would compare a fixture from the last release with the current fixture.",
      "source": [
        "Git · git-show",
        "https://git-scm.com/docs/git-show"
      ]
    },
    {
      "title": "Branch references and upstream tracking",
      "intro": "A local branch and its remote-tracking counterpart are related references, not one shared live object.",
      "points": [
        "Confirm the current branch and its upstream before interpreting ahead or behind counts.",
        "Fetch updates remote-tracking information; an old local view cannot prove the remote branch has not changed.",
        "Choose clear branch names tied to the work. A branch name alone does not document the exact version tested."
      ],
      "q": "What does “ahead of origin/main” mean?",
      "a": "My local history contains commits not present in the local remote-tracking reference. I fetch before relying on that comparison because the reference may be stale. I inspect the actual commits and target branch before deciding whether to push, merge or rebase.",
      "practice": "Draw local main, origin/main and a feature branch with two unshared commits.",
      "source": [
        "Git · git-branch",
        "https://git-scm.com/docs/git-branch"
      ]
    },
    {
      "title": "Safe branch switching and detached HEAD",
      "intro": "Before switching context, understand whether your work is attached to a branch and whether local changes are protected.",
      "points": [
        "Inspect status before switching. Uncommitted edits may carry across branches or prevent the switch when changes would be overwritten.",
        "Detached HEAD means the checkout is at a commit rather than a branch tip. New commits need a branch reference if you want to keep working on them clearly.",
        "Use a separate branch for experiments so their purpose and history remain easy to locate."
      ],
      "q": "What would you do after committing in detached HEAD?",
      "a": "I would create a branch pointing to the current commit before switching away, then inspect the resulting history. I would verify the work is reachable from that branch. I would not discard the checkout or reset it just because its status looks unfamiliar.",
      "practice": "Describe how to preserve an experimental fix made while inspecting an old release commit.",
      "source": [
        "Git · git-switch",
        "https://git-scm.com/docs/git-switch"
      ]
    },
    {
      "title": "Fetching changes before integration",
      "intro": "Fetching lets you inspect incoming work before deciding how to combine it with your changes.",
      "points": [
        "Fetch downloads remote history and updates the relevant remote-tracking references without automatically merging into your current branch.",
        "Review incoming changes that touch shared fixtures, configuration or selectors before running tests against assumptions from yesterday.",
        "Treat authentication or network errors as failed synchronization. Do not assume a fetch succeeded because local files still exist."
      ],
      "q": "Why fetch before deciding how to update a feature branch?",
      "a": "It gives me a current view of remote history while leaving my working branch unintegrated. I can inspect divergence and choose the team-approved merge or rebase approach. This is useful when shared test configuration changed and I need to understand its impact first.",
      "practice": "Outline the checks you perform after fetching but before integrating remote changes.",
      "source": [
        "Git · git-fetch",
        "https://git-scm.com/docs/git-fetch"
      ]
    },
    {
      "title": "Pull strategies and divergent histories",
      "intro": "Pull combines fetching with an integration action whose behavior depends on the chosen strategy and configuration.",
      "points": [
        "Know whether your workflow uses merging, rebasing or fast-forward-only integration before running pull.",
        "Divergence means both histories contain unique commits. It requires an intentional integration choice rather than a blind overwrite.",
        "Keep local changes safe and inspect conflicts. A successful integration still needs appropriate validation of the combined code."
      ],
      "q": "Why might a pull fail on a diverged branch?",
      "a": "The configured strategy may require a fast-forward or an explicit choice of reconciliation. I would inspect the two histories and follow the team’s merge or rebase convention. I would not use a destructive reset merely to remove the error message.",
      "practice": "Explain the difference between updating an unchanged local branch and reconciling two independently changed histories.",
      "source": [
        "Git · git-pull",
        "https://git-scm.com/docs/git-pull"
      ]
    },
    {
      "title": "Push rejection and preserving colleagues’ work",
      "intro": "A rejected push is useful evidence that the remote may contain work your local branch does not include.",
      "points": [
        "Read the rejection reason before retrying. Permission failures and non-fast-forward history conflicts require different responses.",
        "Fetch and inspect new remote commits, then integrate them through the approved workflow and rerun affected checks.",
        "Force updates can replace remote history. Even guarded force-push options require understanding the expected remote state and team agreement."
      ],
      "q": "What would you do when your push is rejected?",
      "a": "I would inspect the message and fetch the latest remote history if the branch advanced. I would integrate the changes, resolve any conflicts and verify the combined result. I would avoid force pushing simply to get my version accepted because that could remove another person’s work.",
      "practice": "Write a safe response sequence for two engineers pushing to the same feature branch.",
      "source": [
        "Git · git-push",
        "https://git-scm.com/docs/git-push"
      ]
    },
    {
      "title": "Remote names, URLs and push destinations",
      "intro": "A remote is a named configuration for a repository location; its name does not guarantee who owns the destination.",
      "points": [
        "Inspect configured fetch and push URLs before sharing code from a newly cloned or copied repository.",
        "Distinguish a team repository from a personal fork. Confirm which branch and remote should receive the change.",
        "Do not place access tokens in committed configuration or pasted troubleshooting output. Use the approved credential mechanism."
      ],
      "q": "Why check remotes before pushing a hotfix?",
      "a": "I want to ensure the commit goes to the authorized repository and intended branch. A familiar remote name can point somewhere unexpected, especially in a forked project. I would inspect the destination and upstream configuration, then push only after validating the hotfix and its scope.",
      "practice": "Compare a fork remote and an upstream remote and identify the proper review destination.",
      "source": [
        "Git · git-remote",
        "https://git-scm.com/docs/git-remote"
      ]
    },
    {
      "title": "Fast-forward and merge-commit history",
      "intro": "Merging can move a branch pointer forward or create a commit that joins histories, depending on their relationship.",
      "points": [
        "A fast-forward is possible when the target has no separate divergent commits relative to the source history.",
        "A merge commit records multiple parents and preserves the branch integration in history when that strategy is used.",
        "Validate the combined behavior after a clean merge. Textual compatibility does not guarantee that two changes work together."
      ],
      "q": "Can a merge succeed without conflicts and still break tests?",
      "a": "Yes. Two edits can combine cleanly as text while disagreeing semantically, such as a changed fixture shape and a helper expecting the old shape. I run affected checks on the merged state and review interfaces shared by both changes. No conflict message is not proof of correctness.",
      "practice": "Create an example of two changes that merge cleanly but produce incompatible test behavior.",
      "source": [
        "Git · git-merge",
        "https://git-scm.com/docs/git-merge"
      ]
    },
    {
      "title": "Rebasing a feature branch deliberately",
      "intro": "Rebase reapplies commits onto a different base and changes the identity of the recreated commits.",
      "points": [
        "Use rebasing according to your team’s workflow, especially when commits have already been shared with others.",
        "Resolve conflicts at the appropriate replayed commit and inspect the final diff against the intended base.",
        "After rebasing, validate the resulting branch. Rewritten history can look tidy while hiding an incorrect conflict resolution."
      ],
      "q": "Why do commit hashes change after a rebase?",
      "a": "The commits are recreated with different ancestry and may also contain conflict-resolution changes, so their identities change. I coordinate before rewriting a shared branch and verify the final behavior. I do not equate a linear history with a successful functional integration.",
      "practice": "Explain when merging upstream is simpler than rebasing a branch already used by several colleagues.",
      "source": [
        "Git · git-rebase",
        "https://git-scm.com/docs/git-rebase"
      ]
    },
    {
      "title": "Amending and describing commits",
      "intro": "A commit message should explain the meaningful change; amending replaces the latest commit rather than appending a separate one.",
      "points": [
        "Write a subject that identifies the behavior changed, followed by context when the reason is not obvious.",
        "Use amend carefully for local corrections. If the original commit is already shared, coordinate the resulting history rewrite.",
        "Inspect the staged changes before amending so unrelated edits do not enter a commit with an inaccurate message."
      ],
      "q": "When would you amend a commit?",
      "a": "I might amend a local, unshared commit to include a missing companion file or correct its description. I first inspect the staged diff and validate the completed change. If others already depend on the commit, I consider a follow-up commit instead of casually rewriting shared history.",
      "practice": "Improve the message “fix tests” into a specific description of the actual behavior corrected.",
      "source": [
        "Git · git-commit",
        "https://git-scm.com/docs/git-commit"
      ]
    },
    {
      "title": "Cherry-picking a focused fix",
      "intro": "Cherry-pick applies the change from selected commits onto the current branch without merging the whole source branch.",
      "points": [
        "Confirm the target branch and whether the selected change depends on earlier commits that are absent there.",
        "Review conflicts in the target context. A fix built for a newer framework may need adaptation on an older release branch.",
        "Validate and trace the backported result, including its new commit identity and relation to the original fix."
      ],
      "q": "How would you backport a test framework fix?",
      "a": "I would identify the smallest relevant commit, inspect its dependencies and apply it to the release branch through the approved process. I would resolve differences using the older branch’s behavior and run affected tests. I would document the relationship to the original change for future maintenance.",
      "practice": "List the evidence needed before cherry-picking a helper fix into an older release branch.",
      "source": [
        "Git · git-cherry-pick",
        "https://git-scm.com/docs/git-cherry-pick"
      ]
    },
    {
      "title": "Stashes and interrupted work",
      "intro": "A stash temporarily stores working changes, but it should not become an unexplained long-term archive.",
      "points": [
        "Give the saved work a meaningful description and inspect what is included, particularly untracked files.",
        "Applying a stash can produce conflicts when the destination changed. Review the resulting files before continuing.",
        "Use a branch and commit for work that needs durable collaboration or a clear review trail."
      ],
      "q": "What is the difference between applying and popping a stash?",
      "a": "Applying attempts to restore changes while retaining the stash entry. Popping attempts to restore and remove it when successful. I inspect the result before assuming anything was removed, especially after conflicts, and avoid creating several indistinguishable stashes that are difficult to recover later.",
      "practice": "Describe how you would pause a partial test refactor to investigate an urgent defect.",
      "source": [
        "Git · git-stash",
        "https://git-scm.com/docs/git-stash"
      ]
    },
    {
      "title": "Tags and reproducible release references",
      "intro": "A tag can identify a release point, helping QA connect evidence to an exact source state.",
      "points": [
        "Distinguish lightweight references from annotated tags with additional metadata. Follow the team’s release tagging convention.",
        "Record the resolved commit alongside the tag in test evidence. Avoid assuming a branch tip remains identical after testing.",
        "Treat published release tags as stable under the team’s process; moving a tag can confuse consumers and invalidate traceability."
      ],
      "q": "Why use a release tag in QA evidence?",
      "a": "It gives the team a meaningful reference to the release source, while the commit identifier provides precise traceability. I also record build artifacts and environment configuration because source alone is not a complete executable environment. I would investigate any mismatch between the tag and deployed build.",
      "practice": "Design a release-evidence record containing tag, commit, artifact identifier and test run.",
      "source": [
        "Git · git-tag",
        "https://git-scm.com/docs/git-tag"
      ]
    },
    {
      "title": "Finding a regression with bisect",
      "intro": "Bisect narrows the commit range where a known behavior changed using repeated good-or-bad observations.",
      "points": [
        "Choose a reliable known-good revision and known-bad revision before starting the search.",
        "Use a deterministic reproduction and consistent environment. Flaky or environment-dependent results can misclassify a revision.",
        "Inspect the identified change and confirm it independently. A commit can expose an older defect rather than be the entire explanation."
      ],
      "q": "When is bisect useful for a QA engineer?",
      "a": "When a reproducible regression appeared across a large history and I can classify intermediate revisions reliably. I keep the test and setup consistent, skip unsuitable revisions when necessary and confirm the resulting candidate. I report the reproduction and evidence rather than presenting the bisect result as an unexplained accusation.",
      "practice": "Define good and bad outcomes for a deterministic claim-search regression.",
      "source": [
        "Git · git-bisect",
        "https://git-scm.com/docs/git-bisect"
      ]
    },
    {
      "title": "Blame as context, not personal blame",
      "intro": "Line attribution helps locate the history behind code but should lead to investigation rather than assumptions about responsibility.",
      "points": [
        "Use attribution to find a related commit, then read its complete change and discussion.",
        "Formatting and code movement can affect attribution. The most recent editor may not have introduced the underlying behavior.",
        "Frame review questions around intent and evidence. This preserves collaboration while still locating the relevant design decision."
      ],
      "q": "How would you use git blame during defect analysis?",
      "a": "I would use it to locate the history around a suspicious line and understand the original intent. Then I would examine the commit, surrounding logic and reproduction. I would avoid assuming the listed author caused the defect, since later interactions or moved code may explain the failure.",
      "practice": "Rewrite an accusatory review comment into an evidence-based question about a change.",
      "source": [
        "Git · git-blame",
        "https://git-scm.com/docs/git-blame"
      ]
    },
    {
      "title": "Reflog and recovery of local references",
      "intro": "The reflog records local reference movements and can help locate work after an accidental branch movement.",
      "points": [
        "Inspect relevant reflog entries before making additional destructive changes that complicate recovery.",
        "Create a new recovery branch at the identified commit, then verify its files and history.",
        "Reflogs are local and subject to expiration; they are not a substitute for backups or pushing intended work."
      ],
      "q": "How might you recover a recently lost local commit?",
      "a": "I would inspect the reflog for the previous branch or HEAD position, identify the candidate commit and create a recovery branch there. I would verify the content before integrating it. I would not promise recovery of uncommitted files or assume another developer has my local reflog.",
      "practice": "Describe a recovery plan after accidentally moving a local branch away from a recent commit.",
      "source": [
        "Git · git-reflog",
        "https://git-scm.com/docs/git-reflog"
      ]
    },
    {
      "title": "Worktrees for parallel investigations",
      "intro": "Worktrees allow multiple working directories associated with one repository, reducing context switching during separate tasks.",
      "points": [
        "Use a dedicated worktree for a release investigation while leaving an unfinished feature checkout intact.",
        "Keep build output, local configuration and test data clearly associated with the correct directory.",
        "Inspect worktree status before removal. A convenient extra checkout can still contain valuable uncommitted work."
      ],
      "q": "Why might a QA engineer use a worktree?",
      "a": "I can reproduce a failure on a release revision while retaining my current automation changes in another directory. I still isolate ports, generated reports and credentials for each run. The shared repository history does not mean the two working directories should share mutable test state.",
      "practice": "Plan two simultaneous checkouts for current development and a production-release regression investigation.",
      "source": [
        "Git · git-worktree",
        "https://git-scm.com/docs/git-worktree"
      ]
    },
    {
      "title": "Ignoring generated files without hiding source",
      "intro": "Ignore rules reduce accidental additions of transient files, but they do not remove files already tracked.",
      "points": [
        "Identify generated reports, local environment files and dependencies that should not enter the source repository.",
        "Review patterns for excessive breadth. Ignoring every JSON file could hide legitimate fixtures or configuration.",
        "Check why a file is ignored when expected changes do not appear. Removing sensitive tracked content requires more than adding an ignore rule."
      ],
      "q": "Why is a tracked report still changing despite an ignore rule?",
      "a": "Ignore patterns primarily affect untracked files. A previously tracked report remains tracked until its repository treatment is deliberately changed. I would coordinate removing generated output from tracking while preserving necessary source and ensuring the build can regenerate the report.",
      "practice": "Propose narrow ignore patterns for reports, local secrets and dependency directories without hiding test fixtures.",
      "source": [
        "Git · gitignore",
        "https://git-scm.com/docs/gitignore"
      ]
    },
    {
      "title": "Line endings and repository attributes",
      "intro": "Cross-platform teams need predictable text handling so a small change does not appear as an entire-file replacement.",
      "points": [
        "Understand repository attributes for text and line endings, especially when Windows and Linux runners share the same project.",
        "Separate deliberate normalization from a functional fix so reviewers can assess the behavior change.",
        "Check executable scripts and generated files on the environment that actually runs them; visual similarity does not guarantee identical bytes."
      ],
      "q": "How would you investigate a diff showing every line changed?",
      "a": "I would check line-ending and formatting changes before reviewing it as a logic rewrite. I would compare repository attributes and editor settings, then separate normalization from the intended fix if appropriate. I would validate scripts on the target runner rather than assuming local execution is sufficient.",
      "practice": "Explain how line-ending normalization could obscure a one-line test assertion change.",
      "source": [
        "Git · gitattributes",
        "https://git-scm.com/docs/gitattributes"
      ]
    },
    {
      "title": "Restoring files versus moving history",
      "intro": "Restoring content and resetting a branch solve different problems; identify what you want to change before choosing a command.",
      "points": [
        "Specify whether the desired target is the working file, staging area or branch reference.",
        "Inspect and preserve useful edits before restoring content, since some operations can discard uncommitted changes.",
        "Use a temporary practice repository to learn behavior rather than experimenting on important work."
      ],
      "q": "How do you unstage a file without losing its edits?",
      "a": "I would use an operation aimed at the staging area, such as restore with the staged option, then verify the working file still contains the changes. I would inspect status and diff afterwards. I would not use a broad hard reset merely to correct the next commit’s contents.",
      "practice": "Describe the difference between unstaging a change and discarding that change from the working tree.",
      "source": [
        "Git · git-restore",
        "https://git-scm.com/docs/git-restore"
      ]
    },
    {
      "title": "Reset modes and deliberate local cleanup",
      "intro": "Reset can move a branch reference and affect staging or working content depending on its mode.",
      "points": [
        "Soft, mixed and hard behavior differ; do not memorize one reset command as a universal undo.",
        "Before moving a reference, inspect which commits and uncommitted changes must remain accessible.",
        "Avoid rewriting a shared branch as routine cleanup. A corrective commit may communicate the change more safely to collaborators."
      ],
      "q": "Why is hard reset risky for unfinished work?",
      "a": "It can replace working-tree and staged content with the selected revision, discarding tracked uncommitted changes. I would first identify what needs preservation and choose the narrowest operation. If I only need to alter staging, a working-tree-destructive action is unnecessary and makes recovery uncertain.",
      "practice": "Choose the intended state of branch, index and working files before describing an undo operation.",
      "source": [
        "Git · git-reset",
        "https://git-scm.com/docs/git-reset"
      ]
    },
    {
      "title": "Protected branches and repository permissions",
      "intro": "Branch protection turns collaboration expectations into enforceable controls where the platform configuration supports them.",
      "points": [
        "Distinguish permission to read, push and merge. Being able to view a project does not imply authority to change its main branch.",
        "Verify direct-push, force-update and deletion restrictions using the team’s configured rules and permitted test account.",
        "Evaluate overlapping rules and role assignments rather than assuming a single visible rule describes effective access."
      ],
      "q": "How would you test a protected release branch?",
      "a": "I would build an action-by-role matrix covering direct push, merge, deletion and force updates. I would verify allowed and denied cases in an approved test repository, inspect effective rules and retain evidence. I would avoid testing destructive operations against a real release branch.",
      "practice": "Create a three-role access matrix for a protected branch in a disposable repository.",
      "source": [
        "GitLab documentation",
        "https://docs.gitlab.com/user/project/repository/branches/protected/"
      ]
    },
    {
      "title": "Required approvals and review state changes",
      "intro": "Approval workflows should reflect the exact change being merged, not simply the presence of a historical approval badge.",
      "points": [
        "Check whether approvals are required or optional under the project configuration and available platform features.",
        "Inspect what happens when new commits arrive after approval, and whether the changed files require different reviewers.",
        "Verify unresolved discussions and failed checks according to the actual merge policy; approval is only one part of readiness."
      ],
      "q": "Why might an approved merge request still be unsafe to merge?",
      "a": "The branch could have changed after review, required checks might fail or important discussions may remain unresolved. I inspect the current diff and the project’s effective merge conditions. I would not treat an old approval as proof that every later change was examined.",
      "practice": "Design a review test where a new commit modifies an assertion after the original approval.",
      "source": [
        "GitLab documentation",
        "https://docs.gitlab.com/user/project/merge_requests/approvals/"
      ]
    },
    {
      "title": "Clones, shallow history and reproducibility",
      "intro": "A cloned repository contains a working copy and history, but CI often fetches a restricted subset for speed.",
      "points": [
        "Know which branch and commit were checked out before comparing local and pipeline behavior.",
        "Shallow history can limit operations requiring older commits or common ancestry, so investigate missing history before blaming the application.",
        "Record dependency and environment inputs as well as source revision when reproducing a build."
      ],
      "q": "Why could a history-based check work locally but fail in CI?",
      "a": "The pipeline checkout may have shallow history or different fetched references. I would inspect the checkout settings and available commits, then fetch the required history through the approved configuration. I would also confirm that both environments actually tested the same revision and dependencies.",
      "practice": "List information needed to reproduce a pipeline checkout locally without assuming the default branch is identical.",
      "source": [
        "Git · git-clone",
        "https://git-scm.com/docs/git-clone"
      ]
    }
  ],
  "cicd": [
    {
      "title": "Runner selection and executor capabilities",
      "intro": "A runner supplies the execution environment; a queued job is not the same as a running test.",
      "points": [
        "Check runner availability, job tags and eligibility when a job remains pending instead of starting.",
        "Verify the executor provides the required operating system, browser support and permissions for the intended workload.",
        "Separate runner capacity problems from test failures so investigation reaches the correct owner quickly."
      ],
      "q": "Why might a job remain pending indefinitely?",
      "a": "No eligible runner may be available for its tags or protection requirements, or capacity may be exhausted. I inspect runner and job configuration before changing the test. Once it starts, I still verify the expected runtime tools because successful scheduling does not establish environment compatibility.",
      "practice": "Create a checklist for a browser test job that never receives a runner.",
      "source": [
        "GitLab · Runner selection and executor capabilities",
        "https://docs.gitlab.com/ci/runners/"
      ]
    },
    {
      "title": "Exit codes and honest job outcomes",
      "intro": "The pipeline relies on process results, so a test script must communicate failure correctly.",
      "points": [
        "Ensure the test runner returns a failing exit code when required assertions fail.",
        "Avoid shell constructs that accidentally discard the failing command’s exit status while generating a report.",
        "Distinguish a completed report-generation step from successful test execution; both may occur during a failed job."
      ],
      "q": "How could a pipeline be green while tests failed?",
      "a": "A wrapper script may ignore the test command’s exit code, or the job may be configured to allow failure. I inspect the actual command result and pipeline rules, then introduce a deliberate failure in a test environment to prove the job reports it correctly.",
      "practice": "Explain how to verify that an intentionally failing test makes its job fail.",
      "source": [
        "GitLab · Exit codes and honest job outcomes",
        "https://docs.gitlab.com/ci/jobs/"
      ]
    },
    {
      "title": "Pipeline triggers and duplicate executions",
      "intro": "A pipeline’s trigger determines its context, permissions and the work it should perform.",
      "points": [
        "Distinguish push, merge-request, schedule, manual and downstream triggers when examining a pipeline run.",
        "Review workflow and job conditions together so one change does not accidentally start redundant expensive suites.",
        "Record source revision and trigger in reports, especially when scheduled runs target a moving branch."
      ],
      "q": "Why do two pipelines sometimes run for one push?",
      "a": "Both branch and merge-request pipeline conditions may match the event. I inspect the trigger context and effective configuration, then adjust the intended workflow rules. I would retain both only if they serve distinct purposes and the additional cost and feedback are justified.",
      "practice": "Design a trigger table showing which checks run on a merge request versus a nightly schedule.",
      "source": [
        "GitLab · Pipeline triggers and duplicate executions",
        "https://docs.gitlab.com/ci/pipelines/"
      ]
    },
    {
      "title": "Conditional jobs and rule ordering",
      "intro": "Job rules decide whether a check is included, so incorrect conditions can silently remove important coverage.",
      "points": [
        "List the intended events and changed paths before writing conditional rules for a job.",
        "Test matching and nonmatching cases, including changes to shared helpers that affect more than one test folder.",
        "Inspect rule order and fallback behavior. A broad condition can unintentionally include or exclude work."
      ],
      "q": "How would you test a path-based pipeline optimization?",
      "a": "I would exercise changes inside and outside the selected paths, then include shared configuration and fixture changes. I would verify both whether the job appears and whether necessary coverage remains. A faster pipeline is not useful if it skips tests affected through indirect dependencies.",
      "practice": "Prepare four file-change examples to validate a selective API-test job rule.",
      "source": [
        "GitLab · Conditional jobs and rule ordering",
        "https://docs.gitlab.com/ci/jobs/job_rules/"
      ]
    },
    {
      "title": "Dependency graphs and needs relationships",
      "intro": "Explicit job dependencies can shorten feedback time without waiting for unrelated work in an earlier stage.",
      "points": [
        "Identify the real prerequisite artifacts and results for each job instead of relying solely on visual stage order.",
        "Configure dependencies so a test cannot run against a missing or wrong build artifact.",
        "Check failure propagation when a prerequisite fails or is conditionally absent; optimized scheduling must preserve required gates."
      ],
      "q": "When would you use a dependency graph?",
      "a": "When independent work can proceed while a specific test waits only for its own build. I map prerequisites and artifact flow, then verify that failed or skipped prerequisite jobs cannot produce a misleading downstream success. I measure the critical path rather than simply adding more stages.",
      "practice": "Draw dependencies for two services that build independently and have one joint integration suite.",
      "source": [
        "GitLab · Dependency graphs and needs relationships",
        "https://docs.gitlab.com/ci/yaml/needs/"
      ]
    },
    {
      "title": "Artifact retention and provenance",
      "intro": "Artifacts connect test evidence and deployable output to the exact job that produced them.",
      "points": [
        "Use identifiable paths and retention suited to investigation needs; a failed run should retain useful evidence where configured.",
        "Record commit, build and environment metadata with results so downloaded files remain interpretable later.",
        "Restrict sensitive report content and avoid overwriting artifacts from parallel jobs with indistinguishable names."
      ],
      "q": "What would you retain after a failed UI run?",
      "a": "I would keep the test report, relevant screenshots or traces, failure logs and source/environment identifiers, with appropriate access and retention. I would avoid collecting unnecessary secrets or full datasets. The evidence should let another engineer investigate without repeating the entire run immediately.",
      "practice": "Design artifact names for three browser jobs so their reports cannot be confused.",
      "source": [
        "GitLab · Artifact retention and provenance",
        "https://docs.gitlab.com/ci/jobs/job_artifacts/"
      ]
    },
    {
      "title": "Cache keys and stale dependency problems",
      "intro": "Caching accelerates preparation but must not become an undocumented source of application behavior.",
      "points": [
        "Choose cache keys that account for relevant dependency changes and avoid incompatible sharing between unrelated environments.",
        "Test a clean-cache run to verify the build can reconstruct what it needs from declared inputs.",
        "Investigate cache hits and restored content before interpreting a failure that occurs only on reused runners."
      ],
      "q": "How would you diagnose a build that passes only with a warm cache?",
      "a": "I would compare restored files and declared dependencies, then run from a clean environment. Missing build steps or undeclared inputs may be masked by cached content. I would fix the reproducibility issue rather than requiring a particular runner’s historical files for success.",
      "practice": "List which files belong in a dependency cache and which should be versioned source or artifacts.",
      "source": [
        "GitLab · Cache keys and stale dependency problems",
        "https://docs.gitlab.com/ci/caching/"
      ]
    },
    {
      "title": "Variable scope and configuration precedence",
      "intro": "The same variable name can receive different values depending on pipeline context and configuration sources.",
      "points": [
        "Separate environment configuration from secrets and document the intended source of each required setting.",
        "When behavior differs, inspect effective scope and precedence without printing confidential values into logs.",
        "Validate missing and invalid configuration before running a long test suite so setup failures are clear."
      ],
      "q": "Why might a job use an unexpected environment URL?",
      "a": "Another variable definition or environment scope may take precedence, or the job may run under a different pipeline context. I inspect configuration sources and resolve the effective value safely. I add a clear environment identity check before tests begin to avoid validating the wrong target.",
      "practice": "Create a configuration checklist for a staging URL that unexpectedly points at another test environment.",
      "source": [
        "GitLab · Variable scope and configuration precedence",
        "https://docs.gitlab.com/ci/variables/"
      ]
    },
    {
      "title": "Predefined identifiers in test evidence",
      "intro": "Pipeline-provided identifiers help connect reports, data and logs without inventing ambiguous run names.",
      "points": [
        "Use the available project, commit, pipeline and job identifiers appropriate to the platform context.",
        "Generate unique test-data namespaces from run identifiers while respecting application field limits.",
        "Do not assume every variable exists in every event type; validate branch, tag and merge-request cases separately."
      ],
      "q": "How would you trace a test-created policy back to its run?",
      "a": "I would record a suitable pipeline or job identifier in approved test metadata and preserve the returned policy identifier in the report. I would include the source commit and environment as well. Cleanup would use the run ownership mapping rather than broad searches by a common customer name.",
      "practice": "Design a short test-data prefix that distinguishes two concurrent jobs.",
      "source": [
        "GitLab · Predefined identifiers in test evidence",
        "https://docs.gitlab.com/ci/variables/predefined_variables/"
      ]
    },
    {
      "title": "Container images and repeatable runtimes",
      "intro": "A container image describes much of the execution environment but does not guarantee every external dependency is controlled.",
      "points": [
        "Choose an image compatible with the runtime, test libraries and browser requirements of the project.",
        "Use a deliberate versioning policy for images; changing a floating tag can change behavior without a source edit.",
        "Record image identity with failure evidence and distinguish missing system libraries from application defects."
      ],
      "q": "Why can identical code fail after an image update?",
      "a": "The runtime, browser or system dependencies may have changed. I compare image identities and relevant versions, reproduce in the previous environment where appropriate and investigate the compatibility difference. I would not change test expectations solely to accommodate an unexplained environment change.",
      "practice": "List the runtime details required to reproduce a Selenium job running in a container.",
      "source": [
        "GitLab · Container images and repeatable runtimes",
        "https://docs.gitlab.com/ci/docker/using_docker_images/"
      ]
    },
    {
      "title": "Service containers and readiness checks",
      "intro": "A started database or dependency container may still be unavailable for the application’s first request.",
      "points": [
        "Configure the intended service hostname, credentials and network access for the job environment.",
        "Wait for a meaningful readiness condition with a timeout rather than assuming process startup means usable service.",
        "Isolate seeded data per run and preserve setup errors separately from application assertion failures."
      ],
      "q": "How would you handle a database service that starts slowly?",
      "a": "I would use a bounded readiness check appropriate to the service, then perform required setup before tests. On timeout I would capture service logs and connection context without secrets. I would avoid an arbitrary long sleep that slows every job and still fails unpredictably.",
      "practice": "Define a readiness condition for a test database before running migrations and API tests.",
      "source": [
        "GitLab · Service containers and readiness checks",
        "https://docs.gitlab.com/ci/services/"
      ]
    },
    {
      "title": "Manual jobs and meaningful release decisions",
      "intro": "A manual step should make a specific decision visible rather than conceal an unclear deployment process.",
      "points": [
        "State what the operator is approving and which tested artifact will be used by the job.",
        "Inspect whether the manual action is blocking or optional under the pipeline’s actual configuration.",
        "Provide evidence and ownership before the decision point so approval does not become a blind button click."
      ],
      "q": "What information should accompany a manual deployment gate?",
      "a": "The tested artifact identity, target environment, check results, known risks and recovery plan should be clear. I would verify who can execute the action and whether the pipeline waits for it. A manual step alone does not prove the correct people reviewed the correct build.",
      "practice": "Write a concise release-gate checklist for a tested API service artifact.",
      "source": [
        "GitLab · Manual jobs and meaningful release decisions",
        "https://docs.gitlab.com/ci/jobs/job_control/"
      ]
    },
    {
      "title": "Merge-request validation context",
      "intro": "Review pipelines should clearly identify whether they test the source branch or a combined result with the target branch.",
      "points": [
        "Know the configured merge-request pipeline mode before interpreting a successful result as integration confidence.",
        "Include the relevant changes and target context in evidence, especially when the target branch advances during review.",
        "Check permissions and secret availability for contributions from different trust contexts, including forks."
      ],
      "q": "Does a passing source-branch pipeline prove the merge is safe?",
      "a": "Not necessarily. The target branch may contain changes that interact with the source branch. I check the pipeline mode and required integration validation, then confirm the current merged result where the workflow supports it. I also ensure the tested revision has not changed since the result.",
      "practice": "Explain a case where two branches pass separately but fail after integration.",
      "source": [
        "GitLab · Merge-request validation context",
        "https://docs.gitlab.com/ci/pipelines/merge_request_pipelines/"
      ]
    },
    {
      "title": "Scheduled regression and test-data ownership",
      "intro": "Scheduled runs need accountable ownership even when no developer is waiting for immediate feedback.",
      "points": [
        "Record the schedule’s branch, environment, time zone and owner so its purpose remains explicit.",
        "Avoid overlapping scheduled jobs that mutate the same data; use isolation or deliberate coordination.",
        "Send actionable failure notifications to an owner and keep unchanged successful runs proportionate to the team’s needs."
      ],
      "q": "What can make a nightly suite unreliable?",
      "a": "A moving environment, overlapping runs, expiring credentials or unowned failures can undermine it. I would inspect scheduling context, data setup and cleanup, then verify failure notifications reach someone responsible. I would distinguish a schedule that did not run from a test suite that ran and failed.",
      "practice": "Create an ownership and data-isolation plan for a nightly Guidewire regression suite.",
      "source": [
        "GitLab · Scheduled regression and test-data ownership",
        "https://docs.gitlab.com/ci/pipelines/schedules/"
      ]
    },
    {
      "title": "Child and downstream pipeline boundaries",
      "intro": "Splitting pipelines can clarify ownership, but the parent must still understand downstream results and artifact relationships.",
      "points": [
        "Define which project or component owns each triggered pipeline and what inputs it receives.",
        "Verify status propagation and failure handling rather than assuming the parent waits for every triggered process.",
        "Trace source revisions and artifacts across the boundary so different services are not accidentally validated against incompatible builds."
      ],
      "q": "How would you test a parent pipeline that triggers integration checks?",
      "a": "I would trigger a controlled success and failure downstream, then inspect the parent’s resulting status and gate behavior. I would verify the expected artifact and revision reach the integration environment. Missing or delayed downstream results should be visible rather than treated as a successful integration.",
      "practice": "Draw the evidence chain from a service build to a separate integration-test pipeline.",
      "source": [
        "GitLab · Child and downstream pipeline boundaries",
        "https://docs.gitlab.com/ci/pipelines/downstream_pipelines/"
      ]
    },
    {
      "title": "Review environments and temporary deployments",
      "intro": "A temporary environment can make a proposed change easier to evaluate before it enters a shared release environment.",
      "points": [
        "Give each environment a clear identity tied to its branch or review context and the deployed artifact.",
        "Use suitable test data and access controls; temporary does not mean publicly accessible or disposable customer data.",
        "Define cleanup and expiration so abandoned reviews do not leave unnecessary resources running."
      ],
      "q": "What would you verify in a review app?",
      "a": "I would confirm the correct revision is deployed, access is appropriate and the relevant change behaves as expected. I would check dependency and data assumptions because a temporary environment may differ from staging. I would also verify cleanup when the review closes or expires.",
      "practice": "Prepare a review-environment checklist covering identity, access, test data and teardown.",
      "source": [
        "GitLab · Review environments and temporary deployments",
        "https://docs.gitlab.com/ci/review_apps/"
      ]
    },
    {
      "title": "Deployment identity and rollback preparation",
      "intro": "A deployment should make it clear which artifact is running and how a failed release can be recovered.",
      "points": [
        "Promote the tested artifact deliberately instead of rebuilding an untracked variation at each environment.",
        "Record deployment history and a verifiable application version so post-deployment tests target the intended release.",
        "Plan recovery for data and compatibility changes; replacing application code alone may not reverse a database migration."
      ],
      "q": "What makes rollback testing meaningful?",
      "a": "I would identify the previous usable artifact, confirm the recovery procedure and validate critical behavior afterwards. I would examine schema and data compatibility before assuming an older binary can run safely. The exercise should verify actual recovery evidence rather than merely restarting the deployment job.",
      "practice": "List the information needed to recover from a failed release with a database change.",
      "source": [
        "GitLab · Deployment identity and rollback preparation",
        "https://docs.gitlab.com/ci/environments/"
      ]
    },
    {
      "title": "Serializing access to shared resources",
      "intro": "Some environments cannot safely receive concurrent deployments or conflicting maintenance operations.",
      "points": [
        "Identify the shared resource explicitly, such as one staging environment, rather than serializing every independent test.",
        "Use the platform’s coordination mechanism where appropriate and verify ordering under concurrent pipeline requests.",
        "Handle canceled or failed jobs so the resource does not remain logically blocked or in an unknown state."
      ],
      "q": "When would you serialize jobs instead of increasing parallelism?",
      "a": "When jobs modify the same non-isolated resource, such as deploying different builds to one staging system. I would coordinate that resource while keeping unrelated checks parallel. I would test contention and failure recovery to ensure the queue preserves a usable environment and clear ownership.",
      "practice": "Design a concurrency rule for two branches attempting to deploy to the same test environment.",
      "source": [
        "GitLab · Serializing access to shared resources",
        "https://docs.gitlab.com/ci/resource_groups/"
      ]
    },
    {
      "title": "Structured test reports and missing-result detection",
      "intro": "A report must accurately describe what executed, including cases that never ran because setup failed.",
      "points": [
        "Generate the supported structured report format and verify file paths match the runner’s actual output.",
        "Distinguish zero tests, skipped tests and passed tests; missing results should not look like complete coverage.",
        "Use stable, meaningful test names so repeated failures and comparisons remain understandable across runs."
      ],
      "q": "How would you validate test-report integration?",
      "a": "I would run a known pass, failure and skip, then check that the platform displays each correctly. I would also test a setup failure that prevents report generation. The job’s exit status and missing-evidence handling should remain clear even when the report parser receives no files.",
      "practice": "Create a small report-verification matrix with passing, failing, skipped and never-started cases.",
      "source": [
        "GitLab · Structured test reports and missing-result detection",
        "https://docs.gitlab.com/ci/testing/unit_test_reports/"
      ]
    },
    {
      "title": "Coverage metrics and their limits",
      "intro": "Coverage shows which code was exercised, not whether assertions were strong or the business outcome was correct.",
      "points": [
        "Identify the metric being measured and the code scope included before comparing percentages.",
        "Review uncovered high-risk behavior and weak assertions rather than optimizing the percentage alone.",
        "Keep coverage collection reproducible and report exclusions so apparent improvements are not caused by reducing measured scope."
      ],
      "q": "Can high code coverage coexist with poor testing?",
      "a": "Yes. Tests can execute lines without checking meaningful outcomes or important combinations. I use coverage to find investigation areas, then assess business risks and assertion quality. I would explain what the metric measures and avoid claiming that a high percentage proves the absence of defects.",
      "practice": "Describe a test that executes a calculation but fails to assert its correct result.",
      "source": [
        "GitLab · Coverage metrics and their limits",
        "https://docs.gitlab.com/ci/testing/code_coverage/"
      ]
    },
    {
      "title": "Pipeline debugging with a reproducible evidence trail",
      "intro": "Efficient debugging separates configuration, environment, setup and test assertion failures.",
      "points": [
        "Identify the earliest relevant failure rather than starting with secondary cleanup errors near the end of the log.",
        "Compare source, inputs, runtime and environment with a known successful run using nonsecret metadata.",
        "Change one suspected factor at a time and retain evidence of the original failure before retrying."
      ],
      "q": "How would you investigate a CI-only failure?",
      "a": "I would inspect the first meaningful error, report and execution context, then compare runner tools, resources, configuration and data with local execution. I would reproduce the smallest relevant scenario. A longer timeout or repeated rerun would be considered only after understanding what condition is actually failing.",
      "practice": "Write an investigation order for a job showing setup failure followed by several missing-file errors.",
      "source": [
        "GitLab · Pipeline debugging with a reproducible evidence trail",
        "https://docs.gitlab.com/ci/debugging/"
      ]
    },
    {
      "title": "Included pipeline templates and version control",
      "intro": "Reusable configuration reduces repetition but introduces dependencies on the template’s identity and behavior.",
      "points": [
        "Record where included configuration comes from and which revision or version is intended.",
        "Review changes to shared templates as potentially affecting every consuming repository or job.",
        "Inspect the effective combined configuration when a job behaves differently from the local YAML fragment."
      ],
      "q": "Why could a pipeline change without editing its main YAML file?",
      "a": "An included template or referenced configuration may have changed, particularly if it follows a moving branch. I would inspect the resolved configuration and template revision. I would use the team’s versioning and rollout process to keep shared updates reviewable and predictable.",
      "practice": "Create an impact checklist for changing a shared Selenium test template used by several projects.",
      "source": [
        "GitLab · Included pipeline templates and version control",
        "https://docs.gitlab.com/ci/yaml/includes/"
      ]
    },
    {
      "title": "Matrix jobs and test-suite sharding",
      "intro": "Parallel combinations and sharding solve different scheduling problems and require different completeness checks.",
      "points": [
        "A matrix varies configured dimensions, such as browser and runtime; sharding divides a suite into portions.",
        "Confirm each required combination or shard runs exactly as intended and that reports can be combined without name collisions.",
        "Keep data independent and measure environment capacity before increasing concurrency aggressively."
      ],
      "q": "How do you verify a sharded suite did not miss tests?",
      "a": "I compare the combined executed test identifiers against the intended suite, checking gaps, duplicates and unexpected skips. I also verify that each shard used the same source and relevant configuration. Faster wall-clock time is meaningful only if the required coverage and evidence remain intact.",
      "practice": "Design a three-shard report summary that proves every intended test was assigned.",
      "source": [
        "GitLab · Matrix jobs and test-suite sharding",
        "https://docs.gitlab.com/ci/yaml/yaml_optimization/"
      ]
    },
    {
      "title": "Untrusted code and pipeline trust boundaries",
      "intro": "A pipeline executes repository content, so access to secrets and privileged resources must reflect who can change that content.",
      "points": [
        "Review the trust level of merge requests and external contributions before allowing sensitive credentials into their jobs.",
        "Limit runner privileges and secret scope to the work actually required by the job.",
        "Treat scripts, dependency installation and artifact contents as part of the execution risk, not just the main test command."
      ],
      "q": "Why is running an untrusted merge request with production secrets dangerous?",
      "a": "The proposed code could execute commands that expose those secrets or affect protected systems. I would use the configured trust boundaries and review process, and keep ordinary validation separate from privileged deployment work. Masked log display alone does not make arbitrary code safe to run with credentials.",
      "practice": "Map which pipeline jobs require test credentials and which, if any, require deployment privileges.",
      "source": [
        "GitLab · Untrusted code and pipeline trust boundaries",
        "https://docs.gitlab.com/ci/pipeline_security/"
      ]
    },
    {
      "title": "Merge queues and integration ordering",
      "intro": "When many changes are ready together, testing each against an old target can leave a gap in combined validation.",
      "points": [
        "Understand whether the platform’s configured merge queue or train validates proposed combinations before they enter the target branch.",
        "Inspect what happens when an earlier queued change fails, is removed or changes after validation.",
        "Keep source and combined-result identities in evidence so a successful check is tied to the appropriate integration state."
      ],
      "q": "What problem does a merge queue address?",
      "a": "It helps validate changes in the context of other changes expected to merge ahead of them, according to the platform workflow. I would still check the actual configuration and failure behavior. It reduces an integration race, but does not replace reliable tests or proper review of the included changes.",
      "practice": "Describe two independently passing changes that require validation in their intended merge order.",
      "source": [
        "GitLab · Merge queues and integration ordering",
        "https://docs.gitlab.com/ci/pipelines/merge_trains/"
      ]
    },
    {
      "title": "Pipeline inputs and deliberate parameter validation",
      "intro": "Explicit inputs make configurable pipeline behavior easier to review than a collection of undocumented free-form settings.",
      "points": [
        "Define allowed values and expected types where the platform supports them, especially for environment or suite selection.",
        "Reject invalid combinations early rather than letting a malformed input reach a deployment command.",
        "Document defaults and distinguish safe test options from privileged actions that require additional controls."
      ],
      "q": "How would you test a parameterized regression pipeline?",
      "a": "I would exercise each supported suite or environment option, a default invocation and invalid values. I would verify the selected jobs and target identity, then check that unsupported combinations fail clearly. I would avoid allowing arbitrary input to become an unchecked shell command or destination.",
      "practice": "Create valid and invalid input cases for selecting smoke versus full regression.",
      "source": [
        "GitLab · Pipeline inputs and deliberate parameter validation",
        "https://docs.gitlab.com/ci/inputs/"
      ]
    },
    {
      "title": "Timeouts, retries and canceled runs",
      "intro": "Execution limits and retries need clear semantics so interrupted work does not appear as a normal test success.",
      "points": [
        "Choose timeouts for observable expected work and capture evidence when the limit is reached.",
        "Retry appropriate transient failures deliberately; preserve the initial failure so recurring instability remains measurable.",
        "Design cleanup for canceled and timed-out runs, including records or environments created before interruption."
      ],
      "q": "How would you test cancellation of a long-running pipeline?",
      "a": "I would cancel it after controlled setup, verify the reported state and inspect which cleanup steps actually execute. I would then check for abandoned test data or locked resources. I would document any separate recovery process rather than assuming every teardown command runs after cancellation.",
      "practice": "List resources that may remain after a browser test job times out during setup.",
      "source": [
        "GitLab · Timeouts, retries and canceled runs",
        "https://docs.gitlab.com/ci/yaml/"
      ]
    }
  ],
  "hr": [
    {
      "title": "Choosing a strength you can demonstrate",
      "intro": "A strength becomes believable when an interviewer can see how it affects your work.",
      "points": [
        "Choose a capability relevant to the vacancy, such as investigating inconsistent data or explaining a release risk.",
        "Prepare one actual example with your action and its observable result. Use a number only if you know how it was measured.",
        "Explain where the strength has limits. A careful investigator still needs to decide when to escalate an unresolved issue."
      ],
      "q": "What strength would you bring to our QA team?",
      "a": "Choose this answer only if it fits your experience: “I am good at making defects reproducible. I organize the preconditions, exact test data and first unexpected result so a developer can investigate quickly. One example I can walk through is [your actual example].” Explain what changed because of your work.",
      "practice": "Write a strength claim, one piece of evidence and the follow-up question most likely to challenge it."
    },
    {
      "title": "Describing a development area with evidence",
      "intro": "A development area is easier to discuss when you can identify a behavior and the practice you use to change it.",
      "points": [
        "Select a real limitation you can talk about comfortably and precisely.",
        "Describe the circumstances in which it matters, such as losing clarity when explaining a complicated defect verbally.",
        "Explain the change you are practising and how you will know it helps. Keep unfinished progress accurate."
      ],
      "q": "What skill are you currently improving?",
      "a": "A possible answer is: “I am practising shorter defect explanations. I start with the business effect, then give the conditions and evidence. I am checking whether someone can reproduce the issue from my notes without needing a long follow-up.” Replace that example with the behavior you are actually working on.",
      "practice": "Record a one-minute answer naming a real limitation, your practice routine and a way to assess improvement."
    },
    {
      "title": "Connecting motivation to the actual role",
      "intro": "Use the job description and facts from the interview to explain what interests you about this particular position.",
      "points": [
        "Identify two responsibilities that connect to your genuine interests or experience, such as policy transactions and API validation.",
        "Distinguish confirmed facts from questions about the team’s process, product configuration or automation maturity.",
        "Describe one contribution you could make and one capability you hope to develop through the work."
      ],
      "q": "Why are you interested in this position?",
      "a": "“The combination of insurance workflows and automation appeals to me because I enjoy tracing a business outcome across systems. I would like to understand how your team validates policy changes and billing effects. The role’s emphasis on [confirmed responsibility] matches the experience or practice I can demonstrate in [real example].”",
      "practice": "Mark two responsibilities in the vacancy and link each to a fact about your background."
    },
    {
      "title": "Explaining a project without exposing client information",
      "intro": "Tell the interviewer enough about the workflow, team and challenge to understand your contribution.",
      "points": [
        "Describe the business purpose in neutral terms and use fictional identifiers for customers, policies and claims.",
        "Separate systems you tested personally from systems you only observed or learned about through colleagues.",
        "Prepare one representative flow with its inputs, expected result and evidence you examined."
      ],
      "q": "Can you explain your most recent project?",
      "a": "Structure the answer around a real project: “The system supported [business workflow]. My responsibility was [actual scope]. For one representative case, I prepared [safe test data], performed [action] and checked [business outcome]. The main challenge was [specific constraint], and I handled it by [actual response].” Keep confidential names and figures out of the example.",
      "practice": "Prepare a two-minute project explanation using fictional data and your own responsibilities."
    },
    {
      "title": "Separating personal ownership from team results",
      "intro": "An interviewer can assess your contribution when you explain which decisions and actions were yours.",
      "points": [
        "Describe the team objective first, then identify the part you personally designed, implemented, investigated or coordinated.",
        "Credit collaborators for their work and connect your action to the team result without claiming sole ownership.",
        "Prepare to answer who reviewed the change, who made the release decision and what evidence you supplied."
      ],
      "q": "What exactly did you own on that project?",
      "a": "“The team owned the release outcome. My part was [real responsibility], including [specific action]. I worked with [role] on [shared decision] and supplied [evidence]. The result I can verify is [actual result].” If you supported part of the work, say which part and describe it clearly.",
      "practice": "Take one résumé bullet and underline every verb that describes your personal contribution."
    },
    {
      "title": "Reporting a serious defect under time pressure",
      "intro": "A critical defect story should show how you established impact and helped the team make a decision.",
      "points": [
        "Describe the affected business operation, the reproducible conditions and who could be affected.",
        "Explain how you verified the issue and communicated urgency while preserving enough evidence for investigation.",
        "Include the decision that followed and identify whether you recommended, reviewed or owned that decision."
      ],
      "q": "How would you report a critical issue just before release?",
      "a": "I would verify the reproduction, capture the build and affected transaction, and notify the accountable people promptly. For example, a duplicated payment needs a clear description of financial impact and known scope. I would distinguish confirmed facts from open questions, explain available workarounds and support the release owner’s decision with evidence.",
      "practice": "Draft a four-sentence escalation for a reproducible duplicate payment in a release candidate."
    },
    {
      "title": "Discussing a defect that escaped testing",
      "intro": "Show how you would investigate a missed defect and turn the finding into a proportionate improvement.",
      "points": [
        "Explain what changed, what coverage existed and why the failure was missed using facts available after investigation.",
        "Consider gaps in requirements, test data, environment behavior or assumptions before choosing a corrective action.",
        "Describe a regression check or process improvement and a way to assess whether it addresses the original cause."
      ],
      "q": "What would you do after a production defect escaped your testing?",
      "a": "I would support containment and reproduction first. Then I would compare the failing conditions with our coverage and find the specific gap. If the defect required an unusual effective-date combination, I would add that case and review related boundaries. I would share the learning with the team and verify that the new check fails for the original defect.",
      "practice": "Describe a missed boundary case and write a corrective action that directly addresses its cause."
    },
    {
      "title": "Owning an automation decision that did not work",
      "intro": "A setback answer can demonstrate how you recognized a poor assumption and changed your approach.",
      "points": [
        "Use a genuine example where the original choice created a measurable problem, such as fragile selectors or excessive run time.",
        "Explain the evidence that caused you to reconsider and the alternatives you evaluated.",
        "State what you changed, what remained unresolved and what you would decide differently next time."
      ],
      "q": "How would you respond if your proposed automation approach proved unreliable?",
      "a": "I would make the failure pattern visible and check which assumption was wrong. If a UI-only approach depended on unstable shared data, I would try isolated fixtures and move suitable checks to the API layer. I would compare reliability and coverage after the change and explain the tradeoff to the team.",
      "practice": "Prepare a real setback story with the original assumption, evidence, correction and remaining limitation."
    },
    {
      "title": "Disagreeing about a defect’s priority",
      "intro": "Priority discussions require business context and a clear account of the consequences of delaying a fix.",
      "points": [
        "Separate functional impact from scheduling urgency and explain the affected users, transactions and workaround.",
        "Invite the product owner or analyst to clarify the business rule and the decision criteria.",
        "Record the agreed priority, residual risk and planned follow-up so the decision remains traceable."
      ],
      "q": "What if a product owner gives your defect a lower priority than you expected?",
      "a": "I would explain the confirmed impact, frequency and workaround, then ask which business consideration drives the priority. If the decision stands, I would document the risk and agreed follow-up. I would escalate through the team process only when the unresolved impact warrants it, using evidence and a specific decision request.",
      "practice": "Compare a rare financial integrity defect with a frequent cosmetic issue and state the information needed for triage."
    },
    {
      "title": "Giving an honest release recommendation",
      "intro": "A recommendation should make the evidence, gaps and decision ownership clear under time pressure.",
      "points": [
        "Summarize the critical journeys tested, failures found and areas still blocked or untested.",
        "Distinguish your quality assessment from the release decision assigned to an accountable stakeholder.",
        "Offer concrete options such as fixing a defect, limiting release scope or accepting a documented residual risk."
      ],
      "q": "Would you sign off if important tests had not run?",
      "a": "I would state exactly which tests ran, why the remaining tests matter and what risk is unresolved. I would recommend the next action based on that evidence. If stakeholders proceed, I would document the decision and monitoring plan. I would not represent incomplete testing as a full pass.",
      "practice": "Write a release recommendation for a build with a passed smoke suite and blocked billing regression."
    },
    {
      "title": "Clarifying an ambiguous business requirement",
      "intro": "An interviewer may ask how you make progress when stakeholders have not yet agreed on the expected result.",
      "points": [
        "Use an example input and two competing outcomes to make the ambiguity concrete.",
        "Ask the person responsible for the rule to choose or refine the expected behavior and record the decision.",
        "Continue independent test design while awaiting clarification, keeping assumptions visible in test cases."
      ],
      "q": "How would you handle “the system should calculate the correct premium” as a requirement?",
      "a": "I would ask for approved examples, rating inputs, effective dates and rounding rules that define correct. I would propose a small example and identify the unresolved expectation. Meanwhile I could design validation and boundary cases whose outcomes are already agreed. I would link the final business decision to the tests.",
      "practice": "Turn an ambiguous installment requirement into two examples and one focused clarification question."
    },
    {
      "title": "Reprioritizing when scope changes",
      "intro": "A scope change needs a revised coverage decision that the team can understand and revisit.",
      "points": [
        "Identify affected requirements, dependencies, test data and previously completed evidence that may now be stale.",
        "List high-impact checks that must be rerun and lower-risk checks that can reasonably wait.",
        "Communicate the tradeoff early and confirm the revised priorities with the appropriate stakeholder."
      ],
      "q": "What would you do if the requirements changed late in the sprint?",
      "a": "I would assess the changed behavior and its dependencies, identify affected tests and estimate the retesting effort. I would propose a risk-based plan showing what can be covered by the deadline and what remains uncertain. I would confirm priorities with the team and update traceability so old results are not reused incorrectly.",
      "practice": "Prepare a revised test plan after a new underwriting rule changes one day before release."
    },
    {
      "title": "Estimating work when information is incomplete",
      "intro": "An estimate becomes useful when its assumptions and uncertainty are visible.",
      "points": [
        "Break the task into discovery, data preparation, implementation, execution and investigation where relevant.",
        "Identify dependencies outside your control, such as an unavailable environment or an unapproved business rule.",
        "Offer a range or checkpoint when precision is unwarranted and revise the estimate as evidence improves."
      ],
      "q": "How would you estimate automation for an unfamiliar workflow?",
      "a": "I would first inspect a representative scenario and the available setup mechanisms. I would separate reusable framework work from individual test cases, state assumptions and identify external dependencies. I would provide an initial range and a short discovery checkpoint, then refine the estimate with evidence from the first completed case.",
      "practice": "Create an estimate for automating claim search that identifies one uncertainty and a plan to resolve it."
    },
    {
      "title": "Negotiating test scope under a tight deadline",
      "intro": "Respond to a short deadline by making the decision and its consequences concrete.",
      "points": [
        "Identify the business risks that must be exercised first and the minimum reliable environment needed.",
        "Present coverage options with explicit omissions, effort and likely impact on confidence.",
        "Agree who can accept residual risk and when the deferred checks will run."
      ],
      "q": "Can you test the entire release by tomorrow?",
      "a": "I would check the release scope, available environment and existing automation before committing. I could propose critical smoke and high-risk regression coverage by tomorrow, with a list of deferred areas and their risks. If complete coverage cannot fit, I would explain that clearly and help the team choose scope or timing.",
      "practice": "Write two feasible coverage options for one day of testing and identify the risk left by each."
    },
    {
      "title": "Receiving difficult feedback constructively",
      "intro": "A strong feedback story explains what you learned and how your behavior changed.",
      "points": [
        "Choose specific feedback you actually received, such as unclear defect steps or late escalation.",
        "Explain how you clarified the feedback and selected one observable improvement.",
        "Describe the follow-up evidence or further adjustment without claiming a perfect outcome."
      ],
      "q": "How do you respond to critical feedback?",
      "a": "I listen for the concrete behavior and ask for an example if the feedback is broad. I agree on a practical change and check later whether it helped. If a report was difficult to reproduce, I would revise the preconditions and expected result, then ask a colleague to follow the steps independently.",
      "practice": "Prepare one real feedback example with the original behavior, change made and follow-up evidence."
    },
    {
      "title": "Giving feedback during test code review",
      "intro": "Helpful review feedback identifies the consequence of a change and gives the author a practical way to address it.",
      "points": [
        "Tie the comment to a specific behavior, such as an assertion that can pass when the wrong policy is returned.",
        "Explain the impact on reliability or coverage and propose a focused alternative.",
        "Keep personal judgments out of the discussion and acknowledge uncertainty when the author may know missing context."
      ],
      "q": "How would you tell a colleague their test is weak?",
      "a": "I would point to the exact assertion and explain the failure it would miss. For example, a check for any result row could pass even when the requested claim is absent. I would suggest asserting the expected claim identifier and ask whether there is a reason the broader check was chosen.",
      "practice": "Rewrite a vague “bad test” comment into a specific review suggestion with a failure example."
    },
    {
      "title": "Helping a teammate learn a domain workflow",
      "intro": "Mentoring is easier to demonstrate through a learning goal, a concrete exercise and a check for understanding.",
      "points": [
        "Determine what the colleague already knows and choose one business flow rather than presenting the entire product.",
        "Walk through a representative example, explain the expected outcome and let the colleague perform a variation.",
        "Follow up with a small independent task and give feedback on the evidence they collect."
      ],
      "q": "How would you help a new tester understand PolicyCenter?",
      "a": "I would begin with one submission scenario, explain the business objective and trace the identifiers, coverage and quote outcome. Then I would ask the tester to vary one input and predict the change before execution. I would review their evidence and questions, then build toward more complex transactions.",
      "practice": "Design a 20-minute onboarding exercise with one learner action and one observable success criterion."
    },
    {
      "title": "Leading a quality improvement without formal authority",
      "intro": "Influence can come from a well-defined problem, useful evidence and a small experiment the team can assess.",
      "points": [
        "Describe the cost of the current problem in terms colleagues recognize, such as time lost diagnosing flaky tests.",
        "Invite the people affected to shape a limited experiment and define how to judge its result.",
        "Share what the experiment showed and agree who will maintain the improvement if it succeeds."
      ],
      "q": "How would you encourage a team to improve flaky-test handling?",
      "a": "I would collect representative failures, identify a recurring cause and propose a small trial with one suite. I would ask developers and testers to agree on ownership and evidence, then compare outcomes after the change. I would use the result to decide whether expansion is worth the maintenance effort.",
      "practice": "Propose a one-sprint improvement experiment with a measurable result and a named owner role."
    },
    {
      "title": "Handoffs across time zones",
      "intro": "A useful handoff should let another person resume work without needing the original investigator online.",
      "points": [
        "State the current status, environment, build, data identifiers and exact next action.",
        "Separate confirmed facts from hypotheses and identify any decisions that require a particular owner.",
        "Use a shared location for sanitized evidence and clarify when urgent synchronous contact is justified."
      ],
      "q": "How would you hand off an unresolved failure to another region?",
      "a": "I would summarize the business impact, reproducible steps and evidence already collected, including what I ruled out. I would identify the next useful check and the owner needed for any decision. I would share safe links or identifiers and confirm the receiving colleague can access the environment and artifacts.",
      "practice": "Write a six-line handoff for an intermittent claim-search failure with one open hypothesis."
    },
    {
      "title": "Communicating technical risk to a business audience",
      "intro": "Explain the affected customer or operation before describing technical mechanics.",
      "points": [
        "State which business action fails, under what conditions and how confident you are in the finding.",
        "Use an example amount or transaction with fictional data when it clarifies the impact.",
        "Close with the decision needed, the available options and the owner of the next action."
      ],
      "q": "How would you explain a data defect to a nontechnical stakeholder?",
      "a": "I would say which business outcome is wrong and give a concise example. For instance, a reversed payment may still appear in an account total, which could lead to an incorrect collection decision. I would explain the known scope, current workaround and decision needed, then offer technical details separately.",
      "practice": "Translate a failed SQL reconciliation into a three-sentence business update without database jargon."
    },
    {
      "title": "Explaining evidence when a defect cannot be reproduced",
      "intro": "Treat an intermittent failure as an investigation with uncertainty you can narrow.",
      "points": [
        "Capture the original data, build, environment, timing and user actions before attempting many reruns.",
        "Compare successful and failed runs to isolate meaningful differences, including shared data and external dependency state.",
        "Communicate reproducibility honestly and agree on additional instrumentation or monitoring when the cause remains unknown."
      ],
      "q": "What would you say if a developer cannot reproduce your defect?",
      "a": "I would share the exact conditions and evidence, then reproduce together using comparable data and configuration. I would check differences rather than assuming either person is wrong. If it remains intermittent, I would document the observed frequency and uncertainty and agree on the next evidence needed.",
      "practice": "Prepare a defect update distinguishing an observed failure, a suspected cause and a confirmed cause."
    },
    {
      "title": "Learning an unfamiliar tool honestly",
      "intro": "Separate what you have used in production, what you have practised and what you still need to learn.",
      "points": [
        "Identify transferable concepts such as test isolation, reliable selectors, assertions and failure diagnosis.",
        "Describe one hands-on exercise you truly completed or a specific first exercise you would undertake.",
        "Explain how you would learn the team’s conventions and seek feedback on a small change."
      ],
      "q": "What if our team uses a tool you have not used professionally?",
      "a": "I would be explicit about my current exposure. I would describe related testing concepts I understand and any actual practice I can demonstrate. My first step would be to run an existing representative test, understand its setup and evidence, then add a small case through the team’s review process.",
      "practice": "Create a truthful three-column inventory of production experience, personal practice and learning priorities."
    },
    {
      "title": "Choosing between competing priorities",
      "intro": "Prioritization becomes credible when you explain the tradeoff, the evidence and the decision owner.",
      "points": [
        "Compare impact, likelihood, urgency and dependencies instead of treating the loudest request as automatically most important.",
        "Identify whether a short investigation can reduce uncertainty before making the larger scheduling decision.",
        "Communicate what is being deferred, why and when its priority will be reconsidered."
      ],
      "q": "Two teams ask for urgent testing support. How do you choose?",
      "a": "I would clarify the business consequences, deadlines and dependencies of both requests, then propose an order based on risk. If priorities conflict across teams, I would involve the accountable lead with a concise comparison. I would communicate the decision and a realistic next update to both teams.",
      "practice": "Rank a payment regression, a cosmetic defect and a blocked test-data request with explicit assumptions."
    },
    {
      "title": "Handling confidential project details in interviews",
      "intro": "A convincing answer can explain your reasoning while protecting customer, employer and project information.",
      "points": [
        "Use generic business scenarios and fictional values instead of identifiable customer records or internal screenshots.",
        "Describe the kind of architecture or workflow only at a level you are permitted to discuss.",
        "If asked for sensitive detail, offer an anonymized equivalent that still demonstrates your judgment."
      ],
      "q": "Can you show us the actual claim or production data involved?",
      "a": "I would explain that I can discuss the testing approach and business impact using fictional data. I could describe the relevant policy, claim and payment relationships and walk through the assertions without disclosing confidential records. If needed, I would create a small sanitized example specifically for the interview.",
      "practice": "Turn a real project example into an anonymized version that preserves the testing decision."
    },
    {
      "title": "Discussing notice period and availability",
      "intro": "Availability answers should reflect commitments you can support and conditions that still need confirmation.",
      "points": [
        "Check your actual obligations and avoid promising an early release that someone else must approve.",
        "Distinguish a confirmed start date from a possible date you are still discussing.",
        "Communicate changes promptly and explain how you would complete a responsible handoff."
      ],
      "q": "How soon can you join?",
      "a": "“My confirmed availability is [actual date or notice period]. An earlier date would depend on [real approval or condition], so I would confirm that before promising it. I can discuss a practical handover plan and keep you updated as soon as the date is settled.” Use only details applicable to your situation.",
      "practice": "Write a joining-date answer with a confirmed commitment and, if relevant, a clearly conditional alternative."
    },
    {
      "title": "Working preferences and remote collaboration",
      "intro": "Describe how you deliver visible progress and handle blockers in the working arrangement relevant to the role.",
      "points": [
        "Explain your normal communication cadence and how you make task status and evidence easy to find.",
        "Identify when a short call is more efficient than a long thread, especially for ambiguous or urgent issues.",
        "Be clear about genuine availability, location and scheduling constraints without promising arrangements you cannot maintain."
      ],
      "q": "How do you stay effective when collaborating remotely?",
      "a": "I keep work and evidence visible in the team’s shared tools, communicate blockers early and include the next action and owner in updates. For ambiguous issues, I suggest a focused discussion and record the decision afterwards. I would adapt the cadence to the team’s time zones and release needs.",
      "practice": "Draft an asynchronous status update containing progress, blocker, impact and next action."
    },
    {
      "title": "Planning growth and the first months in a role",
      "intro": "A realistic growth plan connects immediate learning to useful contributions and feedback.",
      "points": [
        "Start by understanding the product, environments, release process and team expectations.",
        "Choose an early contribution small enough to review, such as improving one reliable smoke scenario.",
        "Agree on evidence of progress and revisit the plan as you learn the implementation’s actual constraints."
      ],
      "q": "What would you focus on in your first few months?",
      "a": "I would learn the critical business journeys, run the existing checks and understand where failures are most costly. I would then take ownership of a small agreed testing task, seek feedback and expand my scope based on evidence. I would clarify the team’s expectations so my learning supports real delivery priorities.",
      "practice": "Create a first-month plan with one learning objective, one practical contribution and one feedback checkpoint."
    }
  ],
  "salary": [
    {
      "title": "Reading a compensation breakdown",
      "intro": "A headline package becomes useful only when you understand what its components actually represent.",
      "points": [
        "Separate recurring fixed compensation, variable compensation, one-time payments and benefits. Ask which figures represent cash payments and which represent employer costs.",
        "Use the same period when comparing amounts. A monthly figure, annual figure and joining payment cannot be compared directly without labeling them.",
        "For an India-based offer described as CTC, ask for the employer’s detailed breakdown instead of assuming the headline equals annual cash or take-home pay."
      ],
      "q": "The recruiter quotes a total package. What would you clarify first?",
      "a": "I would ask for the written breakdown, especially the recurring fixed component, variable component and one-time payments. I would confirm the payment periods and conditions. I would compare the offer on consistent terms and ask payroll to explain deductions rather than estimating take-home pay from the headline.",
      "practice": "Build a blank comparison table with columns for component, amount, frequency, conditions and questions."
    },
    {
      "title": "Variable pay and payout conditions",
      "intro": "Variable compensation requires a closer look at eligibility and performance conditions before you assign it a value.",
      "points": [
        "Ask whether the stated amount is a target, maximum or guaranteed payment and whether individual, team or company performance affects it.",
        "Clarify payout timing, joining-date eligibility and how partial-year service is handled. An annual target may not describe your first-year payment.",
        "Compare offers using a clear guaranteed-pay view and separate variable-pay scenarios. Keep assumptions visible instead of presenting uncertain payments as certain."
      ],
      "q": "How would you discuss a high variable component with a recruiter?",
      "a": "I would say that I want to understand the payout conditions and how the first year is treated. I would ask whether there is flexibility in recurring fixed compensation if predictability is important to me. I would avoid assuming that a target bonus will always be paid in full.",
      "practice": "Write four questions that distinguish a target bonus from a guaranteed payment."
    },
    {
      "title": "Joining bonuses and repayment conditions",
      "intro": "A joining bonus can help with a transition, but it is a one-time component with terms to review.",
      "points": [
        "Ask when the bonus is paid and whether eligibility depends on starting by a particular date or completing another requirement.",
        "Request any repayment conditions in writing, including the period covered and how the amount is calculated if employment ends early.",
        "Compare recurring compensation separately. A large joining bonus should not hide a recurring gap you would be unhappy with after the first year."
      ],
      "q": "Would you accept a joining bonus instead of a fixed-pay increase?",
      "a": "I would compare the short-term benefit with the recurring compensation difference and my priorities. I would clarify payment and repayment terms before deciding. If recurring pay is my main concern, I would explain that a one-time bonus does not fully address it and ask what alternatives are available.",
      "practice": "Draft a response explaining why recurring fixed pay matters more to you than a one-time payment."
    },
    {
      "title": "Equity components and uncertainty",
      "intro": "An equity component needs its own questions because it does not behave like a regular cash salary.",
      "points": [
        "Ask what instrument is offered, how the grant is defined, when it vests and what happens if employment ends before vesting.",
        "Request the relevant plan documents and clarification of any exercise, sale or liquidity restrictions. Do not infer these from the headline value.",
        "Keep guaranteed cash and uncertain equity value separate in your comparison. Seek qualified help for unfamiliar tax or legal implications instead of treating a recruiter’s summary as complete advice."
      ],
      "q": "How would you respond to an offer with a significant equity component?",
      "a": "I would express interest and request the grant and vesting details in writing. I would compare the cash portion independently and avoid counting the stated equity value as guaranteed spendable money. I would then clarify the terms that affect whether the component fits my priorities.",
      "practice": "List five unanswered questions you would resolve before assigning value to an equity component."
    },
    {
      "title": "Comparing benefits you will actually use",
      "intro": "Benefits matter most when their eligibility and practical value match your own circumstances.",
      "points": [
        "List relevant benefits such as leave, health coverage, learning support and working arrangements, then ask for their actual policy terms.",
        "Check whether benefits begin immediately, after a waiting period or only for particular employee groups. Do not assume a headline benefit covers every situation.",
        "Assign importance based on your priorities without inventing an exact cash equivalent. A benefit you cannot use should not dominate the offer comparison."
      ],
      "q": "How do you negotiate when salary flexibility is limited?",
      "a": "I would first identify alternatives that matter to me, such as a clear learning budget or an agreed working arrangement. I would ask which options are available and request their terms in writing. I would evaluate the complete offer without pretending that every benefit is interchangeable with recurring pay.",
      "practice": "Rank five benefits by personal importance and write one clarification question for each."
    },
    {
      "title": "Making salary research comparable",
      "intro": "Useful salary research compares similar roles and compensation definitions rather than collecting unrelated numbers.",
      "points": [
        "Record location, experience level, job scope and compensation definition for each reference. A senior specialist role may not be comparable to a general QA position.",
        "Note when the information was collected and distinguish advertised ranges, self-reported figures and actual written offers. Each has different limitations.",
        "Use several relevant references and explain your reasoning. Do not present a single unusually high figure as proof that every employer should match it."
      ],
      "q": "How would you justify your expected range without sounding arbitrary?",
      "a": "I would connect my range to the responsibilities, my demonstrated relevant skills and several comparable current references. I would make clear whether I mean fixed compensation or the total package. I would remain open to learning how the employer has leveled and budgeted the role.",
      "practice": "Create a research worksheet that captures date, location, role scope, level and compensation definition."
    },
    {
      "title": "Turning QA achievements into negotiation evidence",
      "intro": "Your contribution is easier to discuss when you can explain what changed because of your work.",
      "points": [
        "Choose real examples such as improving a critical regression suite, reducing investigation time or strengthening release coverage. Describe your own contribution accurately.",
        "Use numerical results only when you can explain the baseline, measurement and relevant constraints. A team result should not be presented as your individual achievement.",
        "Connect each example to the new role’s responsibilities. Familiarity with a tool is stronger evidence when you can explain how you used it to solve a problem."
      ],
      "q": "What evidence would you use to support a compensation request?",
      "a": "I would select two or three relevant achievements, explain my actions and describe the supported result. I would link them to the value expected in this role. Where I lack a reliable metric, I would use a concrete example rather than inventing a percentage.",
      "practice": "Write one contribution as problem, action, evidence and relevance to the proposed role."
    },
    {
      "title": "Role level and responsibility alignment",
      "intro": "Compensation discussions should reflect the work you are actually expected to own.",
      "points": [
        "Clarify whether the role involves executing tests, designing frameworks, leading QA delivery, mentoring others or owning release decisions.",
        "Ask how the title and level relate to the organization’s expectations. Similar titles can describe different responsibility levels across employers.",
        "If the interview reveals broader responsibilities than the original description, discuss that difference explicitly and ask whether the offer reflects the updated scope."
      ],
      "q": "How would you respond if the role expands during the interview process?",
      "a": "I would summarize the additional responsibilities and confirm that I have understood them correctly. Then I would ask how they affect the role’s level and compensation range. I would support the discussion with relevant experience and avoid assuming that an attractive title alone guarantees the right scope.",
      "practice": "Compare an automation tester role with a framework-owner role using five responsibility differences."
    },
    {
      "title": "Early recruiter screening conversations",
      "intro": "An early compensation discussion can establish alignment while leaving room to understand the role.",
      "points": [
        "Before offering a narrow number, clarify the role level, location, core responsibilities and whether the recruiter is asking about fixed pay or the total package.",
        "Share a researched range when you have enough context, and state which assumptions it depends on. Avoid a range whose lower end you would not seriously consider.",
        "Ask about the budgeted range respectfully. If expectations are far apart, it is useful to discover that before investing in a long interview process."
      ],
      "q": "What would you say when asked for expectations on the first call?",
      "a": "I would say that, based on my current understanding, I am considering a range of [researched range] for [defined compensation component]. I would ask about the role’s budget and responsibilities, and explain that I would review the complete package before making a final decision.",
      "practice": "Prepare a two-sentence screening response that states a range and its assumptions clearly."
    },
    {
      "title": "Redirecting a salary-history question",
      "intro": "You can keep a salary-history conversation accurate while focusing on the value and scope of the new role.",
      "points": [
        "Decide in advance what information you are comfortable sharing. Do not fabricate current pay or supporting documents to create negotiation pressure.",
        "If you prefer to redirect, explain that you want to discuss the responsibilities and the compensation range for this opportunity.",
        "If a process requires documentation, ask why it is needed, who will receive it and which details are required. Seek appropriate advice if you are unsure of an obligation."
      ],
      "q": "How could you politely redirect a request for your current salary?",
      "a": "I would say, “I would prefer to focus on the scope and budget for this position. Based on the responsibilities and my relevant experience, my expectation is [researched range]. Could we discuss whether that aligns with the role?” I would remain truthful if I choose to share information.",
      "practice": "Write a calm response that redirects the discussion without making a legal claim or inventing compensation."
    },
    {
      "title": "Clarifying a written offer efficiently",
      "intro": "A short, organized clarification list helps you evaluate an offer without creating repeated confusion.",
      "points": [
        "Read the offer once for role details and again for compensation, timing and conditions. Separate missing information from terms you want to negotiate.",
        "Group related questions about fixed pay, variable pay, joining payments, location and start date into one clear message.",
        "Keep a record of the answers and request an updated written document for material changes. An informal explanation may not change the offer itself."
      ],
      "q": "How would you ask several offer questions without appearing disorganized?",
      "a": "I would thank the recruiter and send a concise numbered list grouped by topic. I would distinguish clarification questions from my compensation request and identify anything necessary for my decision. After the discussion, I would confirm the agreed changes in writing.",
      "practice": "Draft five concise clarification questions for an offer with an unclear bonus and working location."
    },
    {
      "title": "Choosing a constructive negotiation moment",
      "intro": "Timing works best when both parties understand the role and have enough information for a meaningful discussion.",
      "points": [
        "Establish broad alignment early, then use a concrete offer and a clearer understanding of responsibilities for a detailed discussion.",
        "Ask for the decision timeline so you know when questions and requests need to be resolved. Avoid disappearing while you consider your response.",
        "Prepare your request before the call, including the evidence, preferred outcome and alternatives you would genuinely consider."
      ],
      "q": "When would you begin a detailed compensation negotiation?",
      "a": "I would establish basic expectations early and usually discuss detailed changes once I understand the role and have a concrete package to review. I would respect the stated timeline, make a focused request and avoid changing my expectations repeatedly without new information.",
      "practice": "Create a short preparation checklist for an offer discussion scheduled for tomorrow."
    },
    {
      "title": "Making one clear counterproposal",
      "intro": "A specific, well-supported proposal gives the other person something concrete to consider.",
      "points": [
        "State the component you want changed and the outcome you are requesting. “A better package” is less actionable than a clear request about recurring fixed compensation.",
        "Give a brief explanation linked to role scope and relevant evidence. Keep personal needs separate from claims about market value.",
        "Leave room for a response and consider the full package. Avoid adding a new demand after every concession simply because the employer was flexible."
      ],
      "q": "How would you structure a counterproposal in a short email?",
      "a": "I would express interest, identify the requested change and give one or two supporting reasons. I would ask whether the employer has flexibility and offer a discussion. I would keep the wording respectful and use a target I can explain, rather than an inflated number chosen only to create room to bargain.",
      "practice": "Write a counterproposal with an opening, one specific request, evidence and a collaborative close."
    },
    {
      "title": "Responding to a stated budget limit",
      "intro": "A budget limit is information to explore, not an automatic reason to argue or accept immediately.",
      "points": [
        "Clarify which component is constrained and whether the role level, fixed pay or overall package has been finalized.",
        "Ask about alternatives only if they matter to you, such as a different level of responsibility, joining support or a defined review process.",
        "Assess the offer against your priorities after understanding the available options. Avoid treating a verbal future possibility as a guaranteed replacement for current compensation."
      ],
      "q": "The recruiter says there is no salary flexibility. How would you respond?",
      "a": "I would acknowledge the constraint and ask whether it applies to recurring fixed pay or the complete package. I would explore relevant alternatives without pressuring the recruiter to promise something unavailable. Then I would decide whether the documented offer meets my needs.",
      "practice": "Prepare two responses: one exploring an alternative and one declining an offer below your acceptable range."
    },
    {
      "title": "Discussing competing offers truthfully",
      "intro": "A competing offer is useful context only when you describe it accurately and protect confidential details.",
      "points": [
        "State only what is real: an interview, verbal indication and written offer are different stages. Do not call an unfinished process a confirmed offer.",
        "Share the details you are comfortable disclosing and explain the decision timeline. Avoid forwarding confidential documents merely to create leverage.",
        "Explain why you remain interested in the employer. A discussion focused only on matching numbers can miss important differences in scope and package structure."
      ],
      "q": "How would you mention another offer without sounding threatening?",
      "a": "I would say that I have another concrete opportunity with a decision deadline, while explaining what interests me about this role. I would describe the relevant comparison accurately and ask whether there is flexibility. I would avoid inventing a competing offer or issuing a deadline I do not intend to follow.",
      "practice": "Draft a response that communicates a real decision deadline and continued interest without an ultimatum."
    },
    {
      "title": "Verbal offers and written confirmation",
      "intro": "A positive conversation is encouraging, but important details still need clear documentation before a decision.",
      "points": [
        "After a verbal offer, ask when the written details will arrive and whether any approvals or conditions remain outstanding.",
        "Summarize your understanding of the title, compensation components, location and start date, then invite corrections.",
        "Make consequential commitments only after understanding the actual offer and its conditions. Do not interpret enthusiasm from an interviewer as confirmation of every term."
      ],
      "q": "The manager says your requested amount is approved. What would you do next?",
      "a": "I would thank them and ask for the revised written offer or formal confirmation through the employer’s process. I would check that the amount refers to the same compensation component we discussed. I would also confirm any remaining conditions and the timeline for a final response.",
      "practice": "Write a brief follow-up summarizing a verbal agreement without assuming unresolved details are settled."
    },
    {
      "title": "Handling pressure for an immediate decision",
      "intro": "A calm request for a defined review period can help you make a considered decision under pressure.",
      "points": [
        "Acknowledge the employer’s timeline and explain which information you still need to review. Give a specific response time rather than an open-ended delay.",
        "Ask whether the deadline can move if important written details are missing. Avoid accepting simply to end an uncomfortable conversation.",
        "If the deadline remains firm, evaluate the available information against your priorities and uncertainty. Do not promise acceptance while intending to keep negotiating indefinitely."
      ],
      "q": "How would you respond to “We need your answer today”?",
      "a": "I would thank them, confirm the deadline and ask for the complete written terms. If I need more time, I would propose a specific extension and explain why. If that is unavailable, I would make a deliberate decision based on what is known rather than claiming certainty about unresolved conditions.",
      "practice": "Prepare a concise request for an extra review day that respects the recruiter’s schedule."
    },
    {
      "title": "Negotiating an internal promotion",
      "intro": "An internal promotion discussion should connect the new responsibilities with clear expectations and compensation decisions.",
      "points": [
        "Document the difference between your current work and the proposed role, including leadership, ownership and delivery expectations.",
        "Ask whether the promotion includes a title, level and compensation change, and whether these changes take effect together or separately.",
        "Use demonstrated contributions and readiness as evidence. Avoid assuming that extra responsibilities automatically create an approved promotion."
      ],
      "q": "How would you discuss compensation when offered additional QA leadership duties?",
      "a": "I would express interest and clarify the ownership, authority and success expectations. I would ask how the expanded role is leveled and compensated, and when any change would take effect. I would support the conversation with relevant contributions and request a clear written understanding of the agreed role.",
      "practice": "Write a role-change summary for moving from test execution to ownership of an automation team’s delivery."
    },
    {
      "title": "Preparing for an annual compensation review",
      "intro": "A review conversation is stronger when you collect evidence throughout the period instead of relying on memory.",
      "points": [
        "Maintain a concise record of responsibilities, delivered improvements, feedback and learning that materially helped the team.",
        "Connect your request to the employer’s review process and timing. Ask how decisions are made and what information your manager needs.",
        "Separate past contributions from future commitments. Do not promise an unrealistic outcome simply to justify a larger increase."
      ],
      "q": "How would you prepare to request a raise during a review?",
      "a": "I would summarize my relevant contributions with supporting examples, explain how my responsibilities have developed and make a clear request. I would ask for feedback on the case and the decision process. If the request cannot be met, I would seek a specific discussion about expectations and the next review opportunity.",
      "practice": "Create a one-page review outline with three contributions, supporting evidence and one compensation request."
    },
    {
      "title": "Evaluating promises of a future review",
      "intro": "A future review is a process commitment, which may be different from a guaranteed compensation change.",
      "points": [
        "Ask when the review will occur, who owns it and which criteria will be considered. Clarify whether the promise concerns a meeting, eligibility or a defined adjustment.",
        "Request documentation of agreed milestones and timing. Do not assume that completing a probation period automatically guarantees an increase.",
        "Evaluate the current offer on its present terms as well as the possible future outcome. Keep uncertainty explicit in your decision."
      ],
      "q": "The employer promises to review your salary in six months. How would you assess it?",
      "a": "I would ask what the review means, which criteria apply and whether any outcome is guaranteed. I would request the agreed timing and process in writing. I would decide whether I can accept the current package even if the review does not lead to the increase I hope for.",
      "practice": "Write three questions that distinguish a promised review from a promised increase."
    },
    {
      "title": "Remote work and location expectations",
      "intro": "Working location affects how an offer fits your life and should be understood alongside compensation.",
      "points": [
        "Clarify office location, expected attendance, travel requirements and whether the arrangement is role-specific or governed by a changeable policy.",
        "Ask how location affects the offer and what approvals are required for working from another city or country. Do not assume a remote label allows unrestricted movement.",
        "Compare commuting time, scheduling and personal priorities without treating an undocumented working arrangement as a permanent guarantee."
      ],
      "q": "How would you include remote work in an offer discussion?",
      "a": "I would explain the arrangement that matters to me and ask what the role supports. I would clarify attendance and travel expectations and request written confirmation of any agreed exception. I would consider the arrangement together with compensation and responsibilities rather than assuming that a remote role has identical terms everywhere.",
      "practice": "Prepare a checklist for comparing a hybrid role with a remote role in a different location."
    },
    {
      "title": "Relocation support and transition costs",
      "intro": "A relocation discussion should separate ongoing compensation from the specific costs of moving into the role.",
      "points": [
        "List the transition costs relevant to your move, then ask which costs the employer covers and through what reimbursement or payment process.",
        "Clarify timing, required evidence, limits and any repayment conditions. Do not assume support is available simply because the role requires a move.",
        "Discuss realistic start-date and location expectations alongside the package. An attractive amount may not solve a transition that cannot be completed on time."
      ],
      "q": "How would you request relocation support?",
      "a": "I would explain the required move and ask whether a relocation policy or allowance applies. I would identify the practical support I need and request its conditions in writing. I would keep that conversation distinct from recurring compensation and avoid presenting unverified costs as fixed facts.",
      "practice": "Draft a relocation request covering eligible costs, payment timing and the proposed start date."
    },
    {
      "title": "Notice periods and feasible start dates",
      "intro": "A start date should reflect commitments you can actually meet, rather than a promise made to strengthen an offer.",
      "points": [
        "Confirm your current obligations and discuss a realistic joining date. Do not promise an early release that has not been approved.",
        "If the employer proposes notice-period support, clarify the process, required approvals and conditions with the relevant parties.",
        "Communicate changes promptly and avoid sharing confidential information from your current employer. Seek qualified advice for unfamiliar contractual questions."
      ],
      "q": "What would you say if a recruiter asks you to join earlier than you can commit to?",
      "a": "I would explain my confirmed availability and distinguish it from any earlier date that still needs approval. I would explore legitimate options without guaranteeing an outcome outside my control. I would keep both sides updated and confirm the final date once the necessary arrangements are agreed.",
      "practice": "Write a response that offers a realistic start date while leaving room for an approved earlier release."
    },
    {
      "title": "Comparing contract and permanent opportunities",
      "intro": "Different engagement arrangements need a consistent comparison of responsibilities, payment terms and benefits.",
      "points": [
        "Clarify the engagement duration, expected hours, payment schedule, leave arrangements and responsibility for equipment or other work expenses.",
        "Do not compare a contract rate directly with an annual employee package without accounting for the periods and components each figure covers.",
        "Review the actual terms and obtain appropriate professional advice for unfamiliar legal or tax questions. Avoid assuming that every contract arrangement follows the same rules."
      ],
      "q": "How would you evaluate a contract rate against a permanent offer?",
      "a": "I would compare the defined work periods, expected hours, payment conditions and benefits, then consider continuity and role scope. I would make assumptions explicit and avoid treating the headline rates as directly equivalent. I would clarify unfamiliar obligations before deciding.",
      "practice": "Create a comparison checklist without calculating tax or assuming a guaranteed number of paid days."
    },
    {
      "title": "Negotiating when returning after a career break",
      "intro": "A return-to-work conversation can acknowledge your recent path while focusing on current readiness and role fit.",
      "points": [
        "Describe the relevant experience and preparation you can support, including recent practice or learning. Distinguish refreshed knowledge from current production experience.",
        "Research comparable roles based on the work you can perform and the responsibilities being offered. Avoid assuming that a break determines one universal compensation outcome.",
        "Consider onboarding support, learning opportunities and role scope alongside the package. Decide which tradeoffs you are willing to make rather than apologizing for your circumstances."
      ],
      "q": "How would you discuss compensation after a career break?",
      "a": "I would explain my relevant background and current preparation, then discuss expectations based on the role’s scope and comparable opportunities. I would be honest about areas I am refreshing. I would evaluate the full offer and avoid accepting an undefined future promise in place of clear current terms.",
      "practice": "Write a short return-to-work introduction that connects actual preparation with the proposed QA responsibilities."
    },
    {
      "title": "Declining an offer professionally",
      "intro": "A clear and respectful decline closes the process without unnecessary criticism or invented explanations.",
      "points": [
        "Respond within the agreed timeline where possible and thank the people who invested time in the process.",
        "State that you have decided not to accept. You may give a brief truthful reason without disclosing private details or criticizing the team.",
        "Avoid leaving the employer with an ambiguous answer while hoping for an unsolicited increase. If you want to negotiate, make that request clearly before declining."
      ],
      "q": "How would you decline an offer that does not meet your priorities?",
      "a": "I would thank the recruiter and team, state that I have decided not to accept, and briefly explain that the opportunity does not align with my current priorities. I would keep the message respectful and concise. I would not invent another offer or use a false decline as a pressure tactic.",
      "practice": "Draft a polite decline in four sentences without disclosing confidential details."
    },
    {
      "title": "Closing the discussion and recording the agreement",
      "intro": "A negotiation is complete only when both sides have a clear understanding of the final terms and next steps.",
      "points": [
        "Check the final written offer against the changes discussed, including the compensation components, role, location and intended start date.",
        "Resolve inconsistencies before confirming your decision. Keep copies of the relevant documents and communications through your own approved records process.",
        "Ask what happens next and who owns any remaining onboarding steps. Do not assume an unanswered question has been settled in your favor."
      ],
      "q": "What would you verify before giving your final response?",
      "a": "I would confirm that the written offer matches the agreed terms and that I understand the remaining conditions. I would ask for corrections where needed, then communicate a clear decision through the employer’s process. I would also confirm the start-date and onboarding arrangements rather than relying on memory of the call.",
      "practice": "Create a final comparison between requested changes, agreed changes and the wording in the updated offer."
    }
  ]
};

for (const [topicId, additions] of Object.entries(ADDITIONAL_CONCEPTS)) {
  const topic = TOPICS.find(t => t.id === topicId);
  const offset = topic.lessons.length;
  additions.forEach((item, index) => {
    const lesson = { ...item, code: item.code || '', language: item.language || '', id: topicId + '-' + (offset + index + 1), topic: topicId };
    lesson.minutes = Math.max(3, Math.ceil([lesson.intro, ...lesson.points, lesson.a, lesson.practice, lesson.code].join(' ').split(/\s+/).length / 160) + 2);
    topic.lessons.push(lesson);
  });
}
