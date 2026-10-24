/* ---------- THEME ---------- */
(function(){
  var root=document.documentElement;
  function cur(){return root.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}
  document.getElementById("themeBtn").addEventListener("click",function(){
    var n=cur()==="dark"?"light":"dark";root.setAttribute("data-theme",n);
    try{localStorage.setItem("sr-theme",n)}catch(e){}
  });
})();

/* ---------- DATA ---------- */
var K=["c0","c1","c2","c3","c4","c5"];
var COL=["pink","yellow","green","blue","purple","orange"];
var skills=[
 ["Product Management","pink",["Product Discovery","Product Strategy","Product Sense","Problem Framing","PRDs","MVP Definition","User Stories","Acceptance Criteria","User Journeys","Roadmaps","RICE","ICE","MoSCoW"]],
 ["Product Analytics","yellow",["KPI Trees","North Star Metrics","Funnel Analysis","Cohort Analysis","Conversion Analysis","Retention","Root-Cause Analysis","Hypothesis Testing","A/B Testing Fundamentals","SQL","Excel"]],
 ["Execution & Collaboration","green",["Agile","Scrum","Kanban","Requirements Gathering","Stakeholder Management","Cross-Functional Coordination","Process Optimization","Technical Feasibility","Prioritization","Sprint Planning"]],
 ["Technical Skills","blue",["C/C++","Python","OOPs","Computer Networking","DBMS","MySQL","Java","Git","GitHub"]],
 ["Tools","purple",["Jira","Figma","Google Analytics","Microsoft Excel","Google Sheets","Git/GitHub"]]
];
var steps=[
 ["Discover","I map the user journey and review how people solve the problem today to find where they struggle."],
 ["Define","I turn findings into a sharp problem statement, a target user and a job to be done."],
 ["Prioritise","I rank ideas with RICE, ICE and MoSCoW so effort goes where impact is highest."],
 ["Design","I sketch flows, write the PRD with user stories and acceptance criteria, and agree the MVP scope."],
 ["Measure","I define a KPI tree, a north star metric and an A/B test plan before anything is built."],
 ["Iterate","I review funnel, retention and root-cause data, then adjust the roadmap."]
];
var groups={
 cases:[
  {id:"checkout",tab:"E-commerce checkout",tag:"Product case study",title:"Reducing checkout friction to improve purchase conversion",proto:"checkout",
   preview:{
    looked:["Shoppers add items to a cart, but many do not complete payment.","Plan, not yet run: 8–10 interviews with recent abandoners, asking them to walk me through the last time they left a cart.","Funnel by step, device and login state to see where the drop-off concentrates."],
    friction:["Surprise fees at the last step","Forced account creation","Long address form on mobile","Payment failures"],
    solutions:["Upfront fee and total display","Address autofill, mobile form","Saved addresses (needs a login base)","Guest checkout behind an A/B test","Optional fields: company, second address line"],
    metrics:["Checkout conversion","Payment failure rate","Refund rate","Average order value"]},
   summary:{goal:"My goal is to lift checkout conversion (completed purchases ÷ eligible checkout sessions). I treat abandonment as a symptom with several candidate causes, rank them by the evidence needed, and test the cheapest high-confidence fixes first.",
    problem:"Shoppers add items to a cart, but many do not complete payment. I do not yet know why, so I will not assume a cause. The funnel numbers in this study are illustrative and only give the analysis a concrete shape.",
    users:"Mobile-first shoppers with purchase intent: new guests, returning logged-out buyers and logged-in repeat buyers. Their needs differ, so I would segment before drawing any conclusion."},
   research:{plan:["Interview 8–10 recent abandoners and ask them to walk through the last time they left a cart. Plan, not yet run.","Break the funnel down by step, device and login state to see where drop-off concentrates.","Review payment failure reasons by method and bank, where data is available.","Walk through three competing checkouts and note steps, fields and when fees appear."],
    funnel:[["Viewed cart",1000],["Started checkout",620],["Address completed",430],["Reached payment",360],["Paid",290]],
    funnelNote:"Illustrative funnel for 1,000 cart views. Checkout conversion here = Paid ÷ Started checkout = 290 ÷ 620 = 47%."},
   roots:[["Surprise fees at the last step","Large exit rate at the payment screen right after the total changes.","Show the full total in the cart for half of shoppers and compare."],["Forced account creation","Exits on the sign-up screen, mostly from new guests.","Offer guest checkout to a share of new shoppers."],["Long address form on mobile","Slow completion and field-level drop-off on phones.","Test autofill and fewer fields on mobile only."],["Payment failures","Failure rate by method, and how many users retry successfully.","Test clearer errors and an easy way to switch method."]],
   prio:[["Upfront fee and total display",8000,2,80,1],["Guest checkout",9000,2,70,2],["Address autofill, shorter mobile form",9000,1,70,2],["Clearer payment error and retry",3000,2,80,1],["Saved addresses",4000,1,60,3]],
   mosc:{must:["Total with all fees visible in the cart","Guest checkout option"],should:["Address autofill","Clear payment failure message with retry"],could:["Saved addresses","Optional fields collapsed"],wont:["Loyalty redesign","New payment methods in this release"]},
   prd:{goal:"Raise checkout conversion by removing the avoidable reasons shoppers abandon a cart.",nongoals:["Redesigning the product pages","Adding new payment methods","Changing pricing"],
    stories:[["a shopper","to see the full total before I start checkout","there are no surprises at payment"],["a new shopper","to check out as a guest","I do not have to create an account first"],["a mobile shopper","my city and state filled from my pincode","I type less"],["a shopper whose payment failed","a clear reason and an easy retry","I can finish my order"]],
    ac:["Given items in the cart, the total including shipping and taxes is shown before checkout starts.","Given a guest, checkout can be completed without creating an account.","Given a valid pincode, city and state are filled automatically and can be edited.","Given a failed payment, the user sees the reason, is told whether money was charged, and can retry or switch method."]},
   metrics:{primary:"Checkout conversion = completed purchases ÷ checkout sessions started.",secondary:["Step-to-step conversion","Time to complete checkout","Guest vs logged-in conversion"],guardrails:["Payment failure rate","Refund rate","Average order value","Support contacts per 1,000 orders"],
    exp:[["Hypothesis","Showing the full total in the cart and offering guest checkout raises checkout conversion."],["Variants","A: current flow. B: proposed MVP flow."],["Split","50/50 by user, held for full weeks."],["Decision rule","Ship B if conversion improves and no guardrail worsens beyond the limit agreed up front."]]},
   rollout:{phases:[["1. Internal","Team and test accounts use the new flow."],["2. 5% of traffic","Watch errors, payment success and guardrails."],["3. 50% A/B","Run the experiment for full weeks."],["4. Full rollout","Ship the winner and keep a small holdback for a short period."]],
    risks:[["Guest checkout lowers repeat sign-ups","Invite guests to create an account after payment."],["Showing fees early changes basket size","Track average order value as a guardrail."],["Autofill fills in wrong data","Let users edit before paying and log corrections."]]},
   next:["Run the 8–10 interviews and tag the themes.","Instrument the funnel by step, device and login state.","Size the A/B test once the baseline is known.","Test the prototype with five shoppers."]},

  {id:"fraud",tab:"Fraud detection",tag:"Product case study",title:"Real-Time Suspicious Transaction Detection",proto:"fraud",
   preview:{
    looked:["Signals available at payment time, such as amount, device, location and repeat attempts.","How Allow, Review and Block outcomes should map to risk.","How flagged cases reach an investigator."],
    friction:["False positives block genuine customers.","False negatives let fraud through.","Investigators may get more cases than they can review."],
    solutions:["Allow / Review / Block risk-scoring framework","Signal-to-decision mapping","Investigation queue with clear handoffs"],
    metrics:["False-positive rate","False-negative rate","Detection coverage","Investigation turnaround time"]},
   summary:{goal:"Catch suspicious transactions in real time while keeping genuine payments flowing.",
    problem:"A single block-or-allow threshold forces a trade-off. Block too much and good customers leave. Block too little and fraud gets through. A middle Review outcome lets borderline cases go to a person. The numbers here are illustrative.",
    users:"Customers making payments, and fraud investigators who review flagged cases."},
   research:{plan:["List the signals available when a payment is made: amount, device, location, speed of repeat attempts and whether the payee is new.","Review how past cases were labelled, if labelled data is available.","Interview investigators about what slows a review down. Plan, not yet run."]},
   roots:[["Rules are too blunt","Many flagged cases turn out to be genuine.","Compare flagged cases against confirmed outcomes."],["Signals are judged one at a time","Fraud often shows up as a combination, such as a new device and a new payee.","Score signals together and compare with single-signal rules."],["Review queue has no priority order","Old, low-risk cases sit ahead of urgent ones.","Sort by score and waiting time, then compare turnaround."],["No feedback from investigators","The same false alarms repeat.","Log investigator decisions and review which signals misfire."]],
   prio:[["Three-outcome routing (Allow / Review / Block)",9000,3,70,2],["Combined risk score",9000,2,70,2],["Priority-ordered review queue",2000,2,80,1],["Investigator feedback loop",2000,1,60,2]],
   mosc:{must:["Risk score from combined signals","Allow / Review / Block routing"],should:["Priority-ordered review queue","Reasons shown to investigators"],could:["Investigator feedback loop","Extra verification step for customers"],wont:["Machine-learning model in the first release","Chargeback automation"]},
   prd:{goal:"Route every payment to Allow, Review or Block using a transparent score.",nongoals:["Building a machine-learning model","Replacing human investigators"],
    stories:[["a genuine customer","my usual payment to go through without extra steps","I can pay quickly"],["a fraud investigator","borderline cases to arrive with the reasons they were flagged","I can decide faster"],["a risk manager","to change the score thresholds","I can balance missed fraud against customer friction"]],
    ac:["Given a payment with no risky signals, the decision is Allow.","Given a score in the Review band, the case appears in the investigator queue with its reasons.","Given a score in the Block band, the payment is stopped and the customer sees a clear next step.","Thresholds can be changed without a code release."]},
   metrics:{primary:"Detection coverage = confirmed suspicious transactions caught ÷ all confirmed suspicious transactions.",secondary:["False-positive rate","False-negative rate","Investigation turnaround time"],guardrails:["Customer drop-off after a Block","Review queue backlog","Support contacts about blocked payments"],
    exp:[["Hypothesis","Three outcomes catch more suspicious payments than one threshold at the same false-positive rate."],["Variants","A: single threshold. B: Allow / Review / Block."],["Method","Shadow mode first: score payments without acting, then compare with confirmed outcomes."],["Decision rule","Move to live routing only if coverage improves and the Review queue stays manageable."]]},
   rollout:{phases:[["1. Shadow mode","Score payments but take no action."],["2. Review only","Send high-risk cases to investigators with no automatic blocks."],["3. Limited Block","Block only the highest-score band."],["4. Tune","Adjust thresholds from investigator feedback."]],
    risks:[["Too many Review cases overload investigators","Start with a narrow Review band and watch the backlog."],["Genuine customers get blocked","Keep the Block band narrow and offer a clear way to verify."],["Fraudsters adapt to the rules","Review signals regularly and keep some rules private."]]},
   next:["Confirm which signals are available at payment time.","Agree thresholds with the risk team.","Run the score in shadow mode.","Interview investigators about review time."]},

  {id:"tower",tab:"Control tower",tag:"Product case study",title:"Operations / Logistics Control Tower",
   preview:{
    looked:["Where delivery exceptions are found and who sees them.","How long each exception has before its SLA is breached.","How escalation works today."],
    friction:["Exceptions pile up without clear owners.","Teams learn about SLA risk too late.","Escalation depends on someone remembering."],
    solutions:["SLA-at-risk dashboard","Owner assignment and countdowns","Escalation workflow"],
    metrics:["SLA breach rate","Mean time to resolution","Overdue exception count","% of exceptions resolved within SLA"]},
   summary:{goal:"Help operations teams resolve exceptions before they breach an SLA.",
    problem:"When many exceptions arrive at once, teams cannot tell which one needs action first or who owns it. By the time risk is visible, the SLA is often already missed. The numbers here are illustrative.",
    users:"Operations coordinators who work exceptions, and managers who watch SLA performance."},
   research:{plan:["Map the life of an exception from detection to closure.","Collect SLA rules and how breaches are counted today.","Interview coordinators about how they decide what to work on next. Plan, not yet run."]},
   roots:[["Exceptions live in several places","People work from different lists.","Count where exceptions are logged and how many appear in more than one place."],["No owner assigned","Items wait because everyone assumes someone else has them.","Measure time from detection to first owner."],["Risk is invisible until breach","Nobody sees the time remaining.","Compare when teams first notice an item with its SLA deadline."],["Escalation is manual","It depends on memory.","Track how often escalation happens before a breach versus after."]],
   prio:[["Exception list sorted by time left",5000,2,80,1.5],["Owner assignment",5000,2,80,1],["Escalation rules with alerts",3000,2,70,2],["Manager summary view",500,1,70,1]],
   mosc:{must:["Exception list sorted by time left","Owner on every exception","Countdown to SLA breach"],should:["Automatic escalation at a set time","Filters by region or customer"],could:["Manager summary view","Export to spreadsheet"],wont:["Predictive delay models","Customer notifications in the first release"]},
   prd:{goal:"Every exception has an owner and a visible countdown, and nothing breaches without an escalation.",nongoals:["Predicting delays before they happen","Changing SLA contracts"],
    stories:[["an operations coordinator","to see exceptions sorted by time left","I work the most urgent first"],["an operations coordinator","to claim or assign an exception","everyone knows who owns it"],["a manager","at-risk exceptions to escalate on their own","I am not relying on someone to remember"]],
    ac:["Given several open exceptions, the list is ordered by time left to breach.","Given an exception with no owner, it is flagged and cannot be missed.","Given an exception inside the escalation window, the owner's manager is notified.","Given a resolved exception, it leaves the active list and counts toward the SLA metrics."]},
   metrics:{primary:"SLA breach rate = exceptions that breached SLA ÷ all exceptions.",secondary:["Mean time to resolution","Overdue exception count","% of exceptions resolved within SLA"],guardrails:["Reassignments per exception","Escalations per week","Spread of workload across coordinators"],
    exp:[["Hypothesis","Owners plus countdowns lower the SLA breach rate."],["Variants","A: current process. B: control tower for one team."],["Method","Pilot with one team and compare with a similar team over the same weeks."],["Decision rule","Expand if the breach rate falls and workload stays balanced."]]},
   rollout:{phases:[["1. Prototype","Walk coordinators through a clickable mock."],["2. One-team pilot","Use real exceptions with one team."],["3. More teams","Add teams in stages."],["4. Tune","Adjust escalation timing from feedback."]],
    risks:[["Teams keep using the old lists","Retire the old lists after the pilot."],["Too many escalations create noise","Start with one escalation level and tune the timing."],["Wrong SLA data shows false urgency","Check SLA rules with their owners before launch."]]},
   next:["Collect SLA rules and exception types.","Mock the dashboard and test it with coordinators.","Define escalation timing with managers.","Choose a pilot team."]},

  {id:"expense",tab:"Expense management",tag:"Product case study",title:"Monthly Expense Management Product",proto:"expense",
   preview:{
    looked:["How people track spending today.","Which categories matter most.","When an alert is helpful and when it becomes noise."],
    friction:["Users lack timely awareness of spending.","Alerts that fire too early or too late may be ignored.","Setting up categories may feel like effort."],
    solutions:["Category-level spending view","Monthly budget tracking","Configurable spending alerts"],
    metrics:["Budget adherence","Alert engagement rate","Monthly active users","Repeat usage","% of users staying within budget"]},
   summary:{goal:"Help people stay within a monthly budget by making spending visible early.",
    problem:"Many people only notice overspending after the month ends. Alerts can help, but the right threshold is not obvious, so I propose testing it. The numbers here are illustrative.",
    users:"Individuals who want a simple view of monthly spending."},
   research:{plan:["Review how existing budgeting apps show spending and alerts.","Interview people about the last time they overspent and what they wished they had known. Plan, not yet run.","Choose the main spending categories to start with."]},
   roots:[["Spending is not visible by category","People cannot see what drives the total.","Check how many users open the category view."],["Alerts arrive too late","The warning comes after the budget is gone.","Compare alert timing with when users change behaviour."],["Alerts arrive too early or too often","Users switch alerts off.","Track alert opt-outs by threshold."],["Setup is too much work","Users never set a budget.","Track how many users finish setup."]],
   prio:[["Monthly budget with progress bar",8000,2,80,1],["Category spending view",8000,1,80,1.5],["Configurable alert threshold",6000,2,60,1],["Weekly summary message",4000,0.5,50,1]],
   mosc:{must:["Category-level spending","Monthly budget tracking","Alert when a threshold is reached"],should:["Configurable threshold","Spending history by month"],could:["Weekly summary","Shared budgets"],wont:["Bank account linking in the first release","Investment tracking"]},
   prd:{goal:"Users can set a monthly budget, see spending by category and receive an alert before they overspend.",nongoals:["Automatic bank sync","Financial advice"],
    stories:[["a user","to set a monthly budget","I know my limit"],["a user","to see spending by category","I understand where my money goes"],["a user","to get an alert at a threshold I choose","I can slow down in time"]],
    ac:["Given a budget and spending entries, the progress bar shows the share used.","Given spending reaches the threshold, one alert is sent and not repeated that month.","Given the user changes the threshold, the new value applies from the next entry.","Given spending passes the budget, the app shows how much over."]},
   metrics:{primary:"Budget adherence = users who finish the month within budget ÷ users with a budget.",secondary:["Alert engagement rate","Monthly active users","Repeat usage","% of users staying within budget"],guardrails:["Alert opt-out rate","Uninstall rate","Support contacts"],
    exp:[["Hypothesis","An alert at 80% leads to more users staying within budget than an alert at 70% or 90%."],["Variants","A: 70%. B: 80%. C: 90%."],["Split","Random by user, held for at least one full month."],["Decision rule","Pick the threshold that raises adherence without raising opt-outs."]]},
   rollout:{phases:[["1. Prototype","Test the concept with a few users."],["2. Closed beta","Small group with real budgets."],["3. A/B test","Compare alert thresholds."],["4. Launch","Ship the winning threshold."]],
    risks:[["Alerts feel annoying","Let users change or mute the threshold."],["Users do not enter spending","Keep entry to a few taps."],["Budget figures look wrong","Show the entries behind every total."]]},
   next:["Interview people about overspending.","Test the alert wording with the prototype.","Plan the threshold A/B test.","Define the first spending categories."]},

  {id:"ops",tab:"Ops productivity",tag:"Product case study",title:"Internal Operations Productivity Tool",
   preview:{
    looked:["How tasks are assigned and tracked today.","Where status updates get lost.","How escalation happens."],
    friction:["Work is scattered across tools and chats.","Ownership and escalation paths are unclear.","SLAs are hard to see."],
    solutions:["Unified workflow for task assignment","Ownership tracking and SLA monitoring","Status updates and escalation management"],
    metrics:["Task completion rate","Average resolution time","SLA compliance","Overdue task count","Escalation rate"]},
   summary:{goal:"Give an operations team one place to assign, track and escalate work.",
    problem:"Tasks come in through chats, email and sheets, so owners and deadlines get lost. The team spends time asking for status instead of doing the work. The numbers here are illustrative.",
    users:"Team members who do the work and leads who track it."},
   research:{plan:["List where tasks arrive today and how they are recorded.","Follow three recent tasks from request to completion.","Interview team members and leads about status updates. Plan, not yet run."]},
   roots:[["Tasks arrive through many channels","Nothing is recorded in one place.","Count channels and tasks with no record."],["No clear owner","Tasks wait because owners are assumed.","Measure time to first owner."],["Status is requested manually","Leads ask in chat for updates.","Count status requests per week."],["Escalation depends on people","It happens late or not at all.","Compare escalation time with the SLA."]],
   prio:[["Task assignment with owner",300,2,80,1],["Status updates",300,1,80,1],["SLA monitoring",300,2,70,1.5],["Escalation workflow",100,2,70,2]],
   mosc:{must:["Task assignment","Ownership tracking","Status updates"],should:["SLA monitoring","Escalation management"],could:["Reports by team","Templates for recurring tasks"],wont:["Time tracking","Billing"]},
   prd:{goal:"One workflow where every task has an owner, a status and a deadline.",nongoals:["Replacing company chat","Long-running project management"],
    stories:[["a team member","to see my tasks in one list","I know what to do next"],["a lead","to see status without asking","I can plan the day"],["a lead","overdue tasks to escalate","nothing stalls"]],
    ac:["Given a new task, it must have an owner and a due date before it is saved.","Given a status change, the lead sees it without asking.","Given a task past its SLA, it is marked overdue and escalated.","Given a completed task, it leaves the active list and counts toward the metrics."]},
   metrics:{primary:"Task completion rate = tasks completed on time ÷ all tasks.",secondary:["Average resolution time","SLA compliance","Overdue task count","Escalation rate"],guardrails:["Tasks without an owner","Reassignments per task","Team satisfaction"],
    exp:[["Hypothesis","One workflow with owners and SLAs raises on-time completion."],["Variants","A: current tools. B: unified workflow for one team."],["Method","Pilot with one team and compare with a similar team."],["Decision rule","Expand if on-time completion rises and the team prefers the tool."]]},
   rollout:{phases:[["1. Prototype","Test the flow with a few team members."],["2. One-team pilot","Run real tasks in the tool."],["3. More teams","Add teams in stages."],["4. Tune","Adjust fields and escalation timing."]],
    risks:[["Team keeps using chat for tasks","Link chat requests to tasks and retire old sheets."],["Too many required fields slow people down","Keep fields to the essentials."],["Overdue alerts create noise","Start with one escalation level."]]},
   next:["Map where tasks arrive today.","Follow three tasks from request to close.","Mock the task list and test it with the team.","Agree SLA rules with the lead."]}
 ],
 teardowns:[
  {id:"swiggy",tab:"Swiggy",tag:"Product teardown",title:"Swiggy: from browsing to a placed order",
   preview:{
    looked:["Discovery: how a user finds something to order.","Checkout: how cart, fees and payment come together."],
    friction:["Too many choices at discovery may slow decisions.","Charges that appear late may cause drop-off."],
    solutions:["Show the full total earlier","Shortcuts for repeat orders","Clearer filters at discovery"],
    metrics:["Funnel conversion"]},
   summary:{goal:"Understand where a hungry user may drop between browsing and ordering.",
    problem:"Many people open a food app unsure what they want. The path from browsing to payment has several decisions, and each one is a chance to leave. This is an outside-in view of how the app works, not company data.",
    users:"Customers ordering food on a phone, from first-time users to regulars."},
   research:{plan:["Walk through the journey as a new user and as a returning user, noting every step and decision.","List where fees, delivery time or choices change.","Plan, not yet run: ask five people to order while thinking aloud."]},
   roots:[["Too many choices at discovery","Users scroll without deciding.","Look at search and filter use before a first add-to-cart."],["Late-appearing charges","The total changes at checkout.","Compare the cart total with the final total and the exit rate at that screen."],["Extra taps in repeat orders","Regulars repeat the same steps.","Count taps from first add-to-cart to payment."]],
   prio:[["Show the full total earlier",10000,2,70,1],["Shortcuts for repeat orders",6000,1,70,2],["Clearer filters at discovery",8000,1,60,2]],
   mosc:{must:["Full total visible before checkout"],should:["Reorder shortcut"],could:["Smarter filter suggestions"],wont:["New delivery models"]},
   prd:{goal:"Raise the share of browsing sessions that end in a placed order.",nongoals:["Changing restaurant pricing","Changing delivery fees"],
    stories:[["a customer","to see my full total in the cart","I can decide without surprises"],["a regular customer","to reorder in a few taps","I save time"]],
    ac:["Given items in the cart, the total with all fees is visible before payment.","Given a past order, the user can add it to the cart in one tap."]},
   metrics:{primary:"Funnel conversion = orders placed ÷ sessions that reached discovery.",secondary:["Add-to-cart rate","Cart-to-order conversion"],guardrails:["Order value","Cancellation rate"],
    exp:[["Hypothesis","Showing the full total earlier raises cart-to-order conversion."],["Variants","A: current flow. B: total shown in the cart."],["Decision rule","Ship B if conversion rises and order value holds."]]},
   rollout:{phases:[["1. Prototype","Test the idea with a few users."],["2. Small A/B","Run on a slice of traffic."],["3. Full rollout","Ship the winner."]],
    risks:[["Showing fees early may lower order value","Track order value as a guardrail."],["More information may clutter the cart","Test layout with users."]]},
   next:["Run the think-aloud sessions.","Map the funnel steps with analytics.","Prototype the earlier total display."]},

  {id:"gpay",tab:"Google Pay",tag:"Product teardown",title:"Google Pay: completing a payment",
   preview:{
    looked:["How a user picks a recipient and pays.","What the user sees when a payment succeeds or fails."],
    friction:["Unclear failure messages may leave users unsure whether money moved.","Retry paths may be hard to find after a failed payment."],
    solutions:["Plain-language failure messages","A clear status for pending payments","One-tap retry or method switch"],
    metrics:["Transaction success rate"]},
   summary:{goal:"Understand where a payment can fail and how a user recovers.",
    problem:"Payments are stressful when money is involved. If a payment fails or stays pending, users need to know right away what happened and what to do. This is an outside-in view of how the app works, not company data.",
    users:"People paying friends, shops and bills from their phone."},
   research:{plan:["Walk through paying a contact and paying a shop, noting each step.","List the failure and pending states a user can see.","Plan, not yet run: ask five people about the last time a payment failed."]},
   roots:[["Unclear failure messages","Users do not know whether money left the account.","Count repeat attempts right after a failure."],["Hard-to-find retry","Users give up after a failure.","Measure how many users retry within a few minutes."],["Pending states with no explanation","Users contact support or pay twice.","Track duplicate payments and support contacts."]],
   prio:[["Plain-language failure messages",10000,2,80,1],["Clear pending status",4000,2,70,1.5],["One-tap retry",6000,1,70,1]],
   mosc:{must:["Clear failure reason","Statement of whether money was charged"],should:["One-tap retry"],could:["Suggested alternative method"],wont:["New payment rails"]},
   prd:{goal:"Raise the share of started payments that complete, and reduce confusion when they do not.",nongoals:["Changing bank processing","Changing fees"],
    stories:[["a user whose payment failed","to know whether my money was charged","I do not pay twice"],["a user whose payment failed","to retry in one tap","I can finish"]],
    ac:["Given a failed payment, the screen explains the reason and states whether money was charged.","Given a failure, a retry or switch-method action is visible without scrolling."]},
   metrics:{primary:"Transaction success rate = completed payments ÷ payments started.",secondary:["Retry rate after failure","Time to completion"],guardrails:["Duplicate payments","Support contacts per 1,000 payments"],
    exp:[["Hypothesis","Clearer failure messages and a one-tap retry raise the success rate after a first failure."],["Variants","A: current messages. B: plain-language message with retry."],["Decision rule","Ship B if retry success rises and duplicates do not."]]},
   rollout:{phases:[["1. Prototype","Test the wording with a few users."],["2. Small A/B","Run on a slice of traffic."],["3. Full rollout","Ship the winner."]],
    risks:[["Wording may be wrong for some bank errors","Map messages to error codes and review with the bank team."],["Retry may cause duplicate payments","Check for pending payment before retrying."]]},
   next:["Run the interviews about failed payments.","List all failure and pending states.","Prototype the new failure screen."]},

  {id:"whatsapp",tab:"WhatsApp",tag:"Product teardown",title:"WhatsApp: onboarding to engagement",
   preview:{
    looked:["The first minutes after sign-up.","How a new user starts a first conversation.","What brings users back."],
    friction:["New users may not know what to do after signing up.","Early engagement may depend on contacts already being on the app."],
    solutions:["A guided first message","Suggest contacts who are already on the app","Gentle prompts that bring users back"],
    metrics:["Activation","User retention"]},
   summary:{goal:"Understand what makes a new user send a first message and return the next day.",
    problem:"A messaging app is only useful when your contacts are on it. A new user who does not reach a first conversation may not come back. This is an outside-in view of how the app works, not company data.",
    users:"New users who just installed the app, and casual users who message rarely."},
   research:{plan:["Sign up as a new user and note every step until the first message.","List what the app suggests next and what it leaves to the user.","Plan, not yet run: ask five new users how they decided whom to message first."]},
   roots:[["No clear first action","New users land on an empty list.","Measure how many new users send a message on day one."],["Few contacts on the app","There is nobody to talk to.","Compare activation by number of contacts already on the app."],["Weak reasons to return","Users forget the app.","Compare day-seven retention for users with and without a first conversation."]],
   prio:[["Guided first message",20000,2,60,2],["Suggest contacts already on the app",20000,1,70,1.5],["Return prompts",10000,0.5,50,1]],
   mosc:{must:["A clear first action after sign-up"],should:["Suggested contacts"],could:["Return prompts"],wont:["A new messaging format"]},
   prd:{goal:"Raise the share of new users who send a first message on day one.",nongoals:["Changing encryption","Adding new chat features"],
    stories:[["a new user","a clear next step after sign-up","I know how to start"],["a new user","to see which contacts are already here","I can message someone right away"]],
    ac:["Given a new sign-up, the first screen shows one clear action.","Given a contact list, contacts already on the app are shown first."]},
   metrics:{primary:"Activation = new users who send a first message within a day ÷ new users.",secondary:["Day-one messages sent","Day-seven retention"],guardrails:["Opt-outs from prompts","Spam reports"],
    exp:[["Hypothesis","A guided first message raises day-one activation."],["Variants","A: current onboarding. B: guided first message."],["Decision rule","Ship B if activation and day-seven retention rise."]]},
   rollout:{phases:[["1. Prototype","Test the flow with new users."],["2. Small A/B","Run on a slice of new sign-ups."],["3. Full rollout","Ship the winner."]],
    risks:[["Prompts feel pushy","Limit how often prompts appear and let users dismiss them."],["Privacy concerns about contact suggestions","Be clear about what is used and let users opt out."]]},
   next:["Run the new-user interviews.","Map the first-day journey.","Prototype the guided first message."]}
 ]
};

/* ---------- RENDER STATIC ---------- */
document.getElementById("yr").textContent=new Date().getFullYear();
document.getElementById("skillGrid").innerHTML=skills.map(function(s){
  return '<div class="tilt" style="--c:var(--'+s[1]+')"><h3>'+s[0]+'</h3><div class="chips">'+s[2].map(function(x,i){return '<span class="chip '+K[i%6]+'">'+x+'</span>'}).join("")+'</div></div>';
}).join("");
document.getElementById("steps").innerHTML=steps.map(function(s,i){
  return '<div class="step" style="--c:var(--'+COL[i]+')"><div class="n">'+(i+1)+'</div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>';
}).join("");
var all=[].concat.apply([],skills.map(function(s){return s[2]}));
var m=all.map(function(x,i){return '<span class="chip '+K[i%6]+'">'+x+'</span>'}).join("");
document.getElementById("track").innerHTML=m+m;

/* ---------- RICE ---------- */
var rice=[["Spending alerts",4000,2,70,1.5],["Category charts",6000,1,80,1],["Bill reminders",2500,1,50,2]];
var riceBody=document.getElementById("riceBody");
riceBody.innerHTML=rice.map(function(r,i){
  return '<tr data-i="'+i+'"><td><input type="text" id="ri-n'+i+'" value="'+r[0]+'" aria-label="Idea name"></td>'
  +'<td><input type="number" id="ri-r'+i+'" min="0" value="'+r[1]+'" aria-label="Reach"></td>'
  +'<td><select id="ri-i'+i+'" aria-label="Impact">'+[[3,"3 Massive"],[2,"2 High"],[1,"1 Medium"],[0.5,"0.5 Low"],[0.25,"0.25 Minimal"]].map(function(o){return '<option value="'+o[0]+'"'+(o[0]===r[2]?' selected':'')+'>'+o[1]+'</option>'}).join("")+'</select></td>'
  +'<td><input type="number" id="ri-c'+i+'" min="0" max="100" value="'+r[3]+'" aria-label="Confidence percent"></td>'
  +'<td><input type="number" id="ri-e'+i+'" min="0.25" step="0.25" value="'+r[4]+'" aria-label="Effort in months"></td>'
  +'<td><span class="rank" id="ri-k'+i+'"></span></td><td class="score" id="ri-s'+i+'"></td>'
  +'<td><div class="sbar"><i id="ri-b'+i+'"></i></div></td></tr>';
}).join("");
function calcRice(){
  var sc=rice.map(function(_,i){
    var R=+document.getElementById("ri-r"+i).value||0,I=+document.getElementById("ri-i"+i).value,C=(+document.getElementById("ri-c"+i).value||0)/100,E=Math.max(+document.getElementById("ri-e"+i).value||0.25,0.25);
    return R*I*C/E;
  });
  var mx=Math.max.apply(null,sc.concat([1]));
  var order=sc.map(function(s,i){return [s,i]}).sort(function(a,b){return b[0]-a[0]});
  var rk=[];order.forEach(function(o,p){rk[o[1]]=p+1});
  sc.forEach(function(s,i){
    document.getElementById("ri-s"+i).textContent=Math.round(s).toLocaleString("en-IN");
    document.getElementById("ri-b"+i).style.width=(s/mx*100)+"%";
    var k=document.getElementById("ri-k"+i);k.textContent=rk[i];k.style.background="var(--"+(rk[i]===1?"green":rk[i]===2?"yellow":"orange")+")";
  });
}
riceBody.addEventListener("input",calcRice);calcRice();

/* ---------- CASE STUDIES ---------- */
var st={g:"cases",i:0,open:null,t:"summary"};
var seg=document.getElementById("seg"),tabs=document.getElementById("tabs"),body=document.getElementById("caseBody");
var inr=function(n){return "₹"+Math.round(n).toLocaleString("en-IN")};
function ul(a){return "<ul>"+a.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul>"}
function chips(a){return '<div class="chips">'+a.map(function(x,j){return '<span class="chip '+K[j%6]+'">'+x+'</span>'}).join("")+"</div>"}
function findCase(id){
  for(var g in groups){for(var i=0;i<groups[g].length;i++){if(groups[g][i].id===id)return {g:g,i:i}}}
  return null;
}
function pathSet(h){try{history.replaceState(null,"","#"+h)}catch(e){}}

function renderCases(){
  seg.hidden=tabs.hidden=!!st.open;
  if(st.open){renderFull();return}
  seg.innerHTML=[["cases","Case studies"],["teardowns","Teardowns"]].map(function(x){return '<button type="button" class="'+(st.g===x[0]?"on":"")+'" data-g="'+x[0]+'">'+x[1]+'</button>'}).join("");
  var list=groups[st.g];
  tabs.innerHTML=list.map(function(c,i){return '<button type="button" class="tab'+(i===st.i?" on":"")+'" data-i="'+i+'">'+c.tab+'</button>'}).join("");
  var c=list[st.i],p=c.preview;
  body.className="case";
  body.innerHTML='<span class="pill c1">'+c.tag+'</span><h3>'+c.title+'</h3>'
   +'<div class="cols4">'
   +'<div><h4>What I looked at</h4>'+ul(p.looked)+'</div>'
   +'<div><h4>Potential friction <span class="pill c0">Hypothesis</span></h4>'+ul(p.friction)+'</div>'
   +'<div><h4>Explored solutions <span class="pill c4">Proposed, not implemented</span></h4>'+ul(p.solutions)+'</div>'
   +'<div><h4>How success would be measured</h4>'+chips(p.metrics)+'</div>'
   +'</div><button type="button" class="open" data-open="'+c.id+'">Open full case study →</button>';
}
seg.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;st.g=b.dataset.g;st.i=0;renderCases()});
tabs.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;st.i=+b.dataset.i;renderCases()});

function openCase(id,quiet){
  var f=findCase(id);if(!f)return;
  st.g=f.g;st.i=f.i;st.open=id;st.t="summary";renderCases();
  if(!quiet){pathSet("case-"+id);document.getElementById("cases").scrollIntoView()}
}
function closeCase(quiet){
  st.open=null;renderCases();
  if(!quiet){pathSet("cases");document.getElementById("cases").scrollIntoView()}
}
body.addEventListener("click",function(e){
  var o=e.target.closest("[data-open]");if(o){openCase(o.dataset.open);return}
  if(e.target.closest("[data-back]")){closeCase();return}
  var t=e.target.closest("[data-t]");if(t){st.t=t.dataset.t;renderFull()}
});

var TABS=[["summary","Summary"],["research","Research"],["roots","Root causes"],["prio","Prioritisation"],["prd","PRD"],["metrics","Metrics & experiment"],["rollout","Rollout & risks"],["next","Next steps"],["proto","Prototype"]];
function renderFull(){
  var c=groups[st.g][st.i],tl=TABS.filter(function(x){return x[0]!=="proto"||c.proto});
  if(st.t==="proto"&&!c.proto)st.t="summary";
  var td=st.g==="teardowns";
  body.className="";
  body.innerHTML='<button type="button" class="back" data-back="1">← All case studies</button>'
   +'<div class="eyebrow">'+c.tag+'</div><h3 class="fh">'+c.title+'</h3>'
   +'<div class="tabs">'+tl.map(function(x){return '<button type="button" class="tab'+(st.t===x[0]?" on":"")+'" data-t="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div>'
   +'<div class="case panel" id="panel">'+panelHTML(c,st.t)+'</div>'
   +'<div class="callout warnbox">'+(td?"Outside-in observations and proposed ideas only. No company data is used and no real results are claimed.":"Illustrative data and proposed ideas only. No real business results are claimed.")+'</div>';
  if(st.t==="proto")initProto(c.proto);
}

function panelHTML(c,t){
  if(t==="summary"){var s=c.summary;return '<p class="t">'+s.goal+'</p><h4>Problem</h4><p class="t dark">'+s.problem+'</p><h4>Users</h4><p class="t dark">'+s.users+'</p>'}
  if(t==="research"){
    var r=c.research,h='<h4>How I would research it</h4>'+ul(r.plan);
    if(r.funnel){
      var mx=r.funnel[0][1];
      h+='<h4>Illustrative funnel</h4>'+r.funnel.map(function(f,i){
        var prev=i?Math.round(f[1]/r.funnel[i-1][1]*100)+"% of previous":"start";
        return '<div class="fn"><span>'+f[0]+'</span><div class="b"><i style="width:'+(f[1]/mx*100)+'%"></i></div><span>'+f[1]+' <small>('+prev+')</small></span></div>';
      }).join("")+'<p class="note">'+r.funnelNote+'</p>';
    }
    return h;
  }
  if(t==="roots"){
    return '<h4>Candidate causes, ranked by what I would need to see</h4><div class="cols2">'+c.roots.map(function(r,i){
      return '<div class="rc" style="--c:var(--'+COL[i%6]+')"><h5>'+r[0]+'</h5><p><b>Evidence I would look for:</b> '+r[1]+'</p><p style="margin-top:6px"><b>How I would test it:</b> '+r[2]+'</p></div>';
    }).join("")+'</div><p class="note" style="margin-top:14px">These are hypotheses. None is confirmed.</p>';
  }
  if(t==="prio"){
    var rows=c.prio.map(function(r){return {n:r[0],R:r[1],I:r[2],C:r[3],E:r[4],s:r[1]*r[2]*r[3]/100/r[4]}}).sort(function(a,b){return b.s-a.s});
    var mxs=rows[0].s||1;
    var h2='<h4>RICE scoring <span class="pill c1">Illustrative numbers</span></h4><div class="tbl"><table class="mini"><thead><tr><th>Idea</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort (months)</th><th>Score</th><th></th></tr></thead><tbody>'
     +rows.map(function(r){return '<tr><td><b>'+r.n+'</b></td><td>'+r.R.toLocaleString("en-IN")+'</td><td>'+r.I+'</td><td>'+r.C+'%</td><td>'+r.E+'</td><td class="score">'+Math.round(r.s).toLocaleString("en-IN")+'</td><td><div class="sbar"><i style="width:'+(r.s/mxs*100)+'%"></i></div></td></tr>'}).join("")
     +'</tbody></table></div>';
    var m=c.mosc,cols=[["Must","green",m.must],["Should","yellow",m.should],["Could","blue",m.could],["Won't (this release)","pink",m.wont]];
    h2+='<h4>MoSCoW for the MVP</h4><div class="cols4">'+cols.map(function(x){return '<div class="mo" style="--c:var(--'+x[1]+')"><b>'+x[0]+'</b>'+ul(x[2])+'</div>'}).join("")+'</div>';
    return h2;
  }
  if(t==="prd"){
    var p=c.prd;
    return '<h4>Goal</h4><p class="t dark">'+p.goal+'</p><h4>Non-goals</h4>'+ul(p.nongoals)
     +'<h4>User stories</h4>'+ul(p.stories.map(function(s){return "As "+s[0]+", I want "+s[1]+" so that "+s[2]+"."}))
     +'<h4>Acceptance criteria</h4>'+ul(p.ac);
  }
  if(t==="metrics"){
    var m2=c.metrics;
    return '<h4>Primary metric</h4><p class="t dark">'+m2.primary+'</p><h4>Secondary metrics</h4>'+chips(m2.secondary)
     +'<h4>Guardrails</h4>'+chips(m2.guardrails)
     +'<h4>Experiment design <span class="pill c4">Proposed, not run</span></h4><dl class="dl">'+m2.exp.map(function(e){return '<dt>'+e[0]+'</dt><dd>'+e[1]+'</dd>'}).join("")+'</dl>';
  }
  if(t==="rollout"){
    var ro=c.rollout;
    return '<h4>Phases</h4><div class="cols4">'+ro.phases.map(function(p,i){return '<div class="mo" style="--c:var(--'+COL[i%6]+')"><b>'+p[0]+'</b><p class="note" style="margin-top:6px">'+p[1]+'</p></div>'}).join("")+'</div>'
     +'<h4>Risks and how I would handle them</h4><div class="cols2">'+ro.risks.map(function(r,i){return '<div class="rc" style="--c:var(--'+COL[(i+3)%6]+')"><h5>'+r[0]+'</h5><p>'+r[1]+'</p></div>'}).join("")+'</div>';
  }
  if(t==="next"){return '<h4>What I would do next</h4>'+ul(c.next)}
  return protoHTML(c.proto);
}

/* ---------- PROTOTYPES ---------- */
function protoHTML(k){
  if(k==="checkout")return ckHTML();
  if(k==="fraud")return frHTML();
  return exHTML();
}
function initProto(k){
  if(k==="checkout")ckInit();else if(k==="fraud")frInit();else exInit();
}

/* checkout */
function ckHTML(){
  return '<div class="sim"><div class="phone" id="ckPhone"></div><div class="ctrl">'
   +'<div class="seg" id="ckSeg"><button type="button" class="on" data-f="current">Current flow</button><button type="button" data-f="proposed">Proposed MVP</button></div>'
   +'<p class="note" style="font-size:.95rem">Switch flows and complete a purchase in each. Count the screens, fields and surprises. Tick “Simulate a payment failure” to see how each flow recovers.</p>'
   +'<label class="chk" for="ckFail"><input type="checkbox" id="ckFail"> Simulate a payment failure</label>'
   +'<div class="ckstats" id="ckStats"></div>'
   +'<div class="callout">Working concept prototype with illustrative prices. It does not process payments or connect to a real store.</div></div></div>';
}
function ckInit(){
  var F={
    current:[{k:"cart",f:0,s:0},{k:"acct",f:5,s:0},{k:"addr",f:9,s:0},{k:"review",f:0,s:2},{k:"result",f:0,s:0}],
    proposed:[{k:"cart",f:0,s:0},{k:"addr",f:4,s:0},{k:"review",f:0,s:0},{k:"result",f:0,s:0}]
  };
  var flow="current",idx=0,ctr,fail=false,done=false;
  var phone=document.getElementById("ckPhone"),stats=document.getElementById("ckStats"),chk=document.getElementById("ckFail");
  function reset(){idx=0;ctr={screens:1,fields:0,surprises:0,taps:0};fail=chk.checked;done=false}
  function flds(a){return a.map(function(x){return '<div class="fld">'+x+'</div>'}).join("")}
  function items(){return '<div class="li"><span>Running shoes</span><span>₹1,299</span></div><div class="li"><span>Sports socks (3)</span><span>₹599</span></div>'}
  function screen(){
    var k=F[flow][idx].k;
    if(k==="cart"){
      if(flow==="current")return '<b>Your cart</b>'+items()+'<div class="li tot"><span>Subtotal</span><span>₹1,898</span></div><p class="note">Shipping and fees are calculated at checkout.</p><button type="button" class="act" data-a="next">Checkout</button>';
      return '<b>Your cart</b>'+items()+'<div class="li tot"><span>Subtotal</span><span>₹1,898</span></div><p class="note">Shipping ₹49, taxes included. Total ₹1,947.</p><button type="button" class="act" data-a="next">Checkout as guest</button><button type="button" class="act alt" data-a="signin">Sign in for saved details</button><p class="note" id="ckNote"></p>';
    }
    if(k==="acct")return '<b>Create an account to continue</b>'+flds(["Full name","Email","Mobile number","Password","Confirm password"])+'<button type="button" class="act" data-a="next">Create account</button>';
    if(k==="addr"){
      if(flow==="current")return '<b>Delivery address</b>'+flds(["Full name","Mobile number","Pincode","Address line 1","Address line 2","Landmark","Company name","City","State"])+'<button type="button" class="act" data-a="next">Continue</button>';
      return '<b>Delivery address</b>'+flds(["Full name","Mobile number","Pincode","Address"])+'<p class="note">City and state are filled in from the pincode.</p><p class="note">+ Add company or second address line (optional)</p><button type="button" class="act" data-a="next">Continue to payment</button>';
    }
    if(k==="review"){
      if(flow==="current")return '<b>Review order</b>'+items()+'<div class="li"><span>Shipping</span><span class="new">₹49 new</span></div><div class="li"><span>Platform fee</span><span class="new">₹19 new</span></div><div class="li tot"><span>Total</span><span>₹1,966</span></div><button type="button" class="act" data-a="next">Pay ₹1,966</button>';
      return '<b>Pay</b><div class="li tot"><span>Total (as shown in cart)</span><span>₹1,947</span></div><div class="chips" style="margin:10px 0"><span class="chip c3">UPI</span><span class="chip c4">Card</span></div><button type="button" class="act" data-a="next">Pay ₹1,947</button>';
    }
    var total=flow==="current"?"₹1,966":"₹1,947";
    if(fail){
      if(flow==="current")return '<b>Something went wrong.</b><p class="note">Please try again later.</p><button type="button" class="act" data-a="restart">Back to cart</button>';
      return '<b>Payment did not go through.</b><p class="note">Your money was not charged. Try again or switch method.</p><button type="button" class="act" data-a="retry">Try again</button><button type="button" class="act alt" data-a="retry">Switch to card</button>';
    }
    done=true;
    return '<b>Order placed</b><p class="note">Order total '+total+'. Completed in '+ctr.screens+' screens with '+ctr.fields+' fields and '+ctr.surprises+' surprises.</p><button type="button" class="act alt" data-a="again">Run again</button>';
  }
  function draw(){
    phone.innerHTML=screen();
    stats.innerHTML=[["Screens",ctr.screens],["Fields",ctr.fields],["Surprises",ctr.surprises],["Taps",ctr.taps]].map(function(x){return '<div><b>'+x[1]+'</b><span>'+x[0]+'</span></div>'}).join("");
  }
  function go(i){idx=i;ctr.screens++;ctr.fields+=F[flow][i].f;ctr.surprises+=F[flow][i].s}
  phone.addEventListener("click",function(e){
    var b=e.target.closest("[data-a]");if(!b)return;var a=b.dataset.a;
    if(a==="signin"){var n=document.getElementById("ckNote");if(n)n.textContent="Saved details need an account. Not part of this demo.";return}
    ctr.taps++;
    if(a==="next")go(idx+1);
    else if(a==="retry"){fail=false}
    else if(a==="restart"){fail=false;go(0)}
    else if(a==="again"){reset()}
    draw();
  });
  document.getElementById("ckSeg").addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;flow=b.dataset.f;
    this.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});
    reset();draw();
  });
  chk.addEventListener("change",function(){if(!done&&F[flow][idx].k!=="result")fail=chk.checked;else{reset();draw()}});
  reset();draw();
}

/* fraud */
function frHTML(){
  return '<div class="sim"><div class="ctrl">'
   +'<label for="frAmt"><span class="row"><span>Payment amount</span><output id="frAmtOut"></output></span><input type="range" id="frAmt" min="500" max="200000" step="500" value="25000"></label>'
   +'<fieldset><legend>Signals</legend><div class="radios" style="display:grid">'
   +[["frDev","New device"],["frLoc","Unusual location"],["frVel","3 or more attempts in 10 minutes"],["frPay","First-time payee"]].map(function(x,i){return '<label for="'+x[0]+'"><input type="checkbox" id="'+x[0]+'"'+(i===0?" checked":"")+'>'+x[1]+'</label>'}).join("")
   +'</div></fieldset>'
   +'<div class="callout">Concept prototype with simple, illustrative rules. It is not a real fraud model.</div></div>'
   +'<div class="phone"><div class="note">Risk score</div><div class="big" id="frScore"></div>'
   +'<div class="zone"><u id="frMark"></u></div><div class="note" style="display:flex;justify-content:space-between"><span>Allow under 30</span><span>Review 30–59</span><span>Block 60+</span></div>'
   +'<span class="status" id="frDec"></span><p class="note" style="margin-top:12px;color:var(--ink)" id="frWhy"></p></div></div>';
}
function frInit(){
  function upd(){
    var a=+document.getElementById("frAmt").value;
    var why=[["Base score",5]];
    var ap=a>=100000?35:a>=50000?25:a>=10000?10:0;
    if(ap)why.push(["Amount "+inr(a),ap]);
    [["frDev","New device",20],["frLoc","Unusual location",25],["frVel","Repeat attempts",20],["frPay","First-time payee",15]].forEach(function(s){if(document.getElementById(s[0]).checked)why.push([s[1],s[2]])});
    var sc=Math.min(100,why.reduce(function(t,w){return t+w[1]},0));
    var d=sc>=60?["Block","var(--bad)"]:sc>=30?["Review","var(--warn)"]:["Allow","var(--good)"];
    document.getElementById("frAmtOut").textContent=inr(a);
    document.getElementById("frScore").textContent=sc+" / 100";
    document.getElementById("frMark").style.left="calc("+sc+"% - 2px)";
    var el=document.getElementById("frDec");el.textContent=d[0];el.style.color=d[1];el.style.border="2px solid "+d[1];
    document.getElementById("frWhy").textContent="Why: "+why.map(function(w){return w[0]+" +"+w[1]}).join(", ")+"."+(d[0]==="Review"?" This case would go to an investigator.":d[0]==="Block"?" The payment would be stopped and the customer shown how to verify.":" The payment would go through.");
  }
  document.getElementById("caseBody").querySelector(".sim").addEventListener("input",upd);upd();
}

/* expense */
var cats=[["Food",8000,"pink"],["Transport",3500,"blue"],["Shopping",6000,"yellow"],["Bills",4000,"green"]];
function exHTML(){
  return '<div class="sim"><div class="ctrl">'
  +'<label for="budget"><span class="row"><span>Monthly budget</span><output id="budgetOut"></output></span><input type="range" id="budget" min="10000" max="60000" step="1000" value="30000"></label>'
  +'<fieldset><legend>Alert threshold (A/B variant)</legend><div class="radios">'
  +[70,80,90].map(function(v,i){return '<label for="thr'+v+'"><input type="radio" name="thr" id="thr'+v+'" value="'+v+'"'+(i===0?" checked":"")+'>'+v+'%</label>'}).join("")
  +'</div></fieldset>'
  +cats.map(function(c,i){return '<label for="cat'+i+'"><span class="row"><span>'+c[0]+'</span><output id="catOut'+i+'"></output></span><input type="range" id="cat'+i+'" min="0" max="20000" step="500" value="'+c[1]+'"></label>'}).join("")
  +'</div><div class="phone"><div class="note">Spent this month</div><div class="big" id="spent"></div>'
  +'<div class="stack" id="stack"></div><div class="chips" id="legend"></div>'
  +'<div class="meter"><i id="fill"></i><u id="mark"></u></div>'
  +'<div class="note" id="pct"></div><span class="status" id="status"></span><p class="note" id="msg" style="margin-top:10px;color:var(--ink)"></p></div></div>'
  +'<div class="callout">Working concept prototype with illustrative numbers. It does not connect to a bank or a real product.</div>';
}
function exInit(){
  function upd(){
    var b=+document.getElementById("budget").value,thr=+document.querySelector('input[name="thr"]:checked').value;
    var vals=cats.map(function(_,i){return +document.getElementById("cat"+i).value});
    var sp=vals.reduce(function(a,c){return a+c},0),p=sp/b;
    document.getElementById("budgetOut").textContent=inr(b);
    vals.forEach(function(v,i){document.getElementById("catOut"+i).textContent=inr(v)});
    document.getElementById("spent").textContent=inr(sp);
    document.getElementById("stack").innerHTML=sp?vals.map(function(v,i){return '<span style="width:'+(v/sp*100)+'%;background:var(--'+cats[i][2]+')"></span>'}).join(""):"";
    document.getElementById("legend").innerHTML=cats.map(function(c,i){return '<span class="chip c'+[0,3,1,2][i]+'">'+c[0]+'</span>'}).join("");
    var f=document.getElementById("fill"),s=document.getElementById("status"),msg=document.getElementById("msg");
    f.style.width=Math.min(p*100,100)+"%";
    document.getElementById("mark").style.left="calc("+thr+"% - 1px)";
    document.getElementById("pct").textContent=Math.round(p*100)+"% of budget used. Alert threshold marked at "+thr+"%.";
    var col,t,m;
    if(p>=1){col="var(--bad)";t="Over budget";m="You are "+inr(sp-b)+" over your "+inr(b)+" budget.";}
    else if(p>=thr/100){col="var(--warn)";t="Alert sent";m="Alert at "+thr+"%: you have used "+Math.round(p*100)+"% of your "+inr(b)+" budget. "+inr(b-sp)+" left.";}
    else{col="var(--good)";t="On track";m="No alert yet. The alert would fire at "+inr(b*thr/100)+". "+inr(b-sp)+" left.";}
    f.style.background=col;s.textContent=t;s.style.color=col;s.style.border="2px solid "+col;msg.textContent=m;
  }
  document.getElementById("caseBody").querySelector(".sim").addEventListener("input",upd);upd();
}

/* deep links */
function fromHash(){
  var h=location.hash||"";
  if(h.indexOf("#case-")===0){var id=h.slice(6);if(st.open!==id){openCase(id,true);document.getElementById("cases").scrollIntoView()}}
  else if(h==="#cases"&&st.open){closeCase(true)}
}
window.addEventListener("hashchange",fromHash);
renderCases();
fromHash();

/* ---------- COPY ---------- */
document.querySelectorAll(".copy").forEach(function(b){
  b.addEventListener("click",function(){
    var v=b.dataset.copy;
    function done(){var o=b.textContent;b.textContent="Copied";setTimeout(function(){b.textContent=o},1400)}
    try{navigator.clipboard.writeText(v).then(done,function(){})}catch(e){}
  });
});

/* ---------- 3D TILT (pointer devices only) ---------- */
if(matchMedia("(hover:hover)").matches&&!matchMedia("(prefers-reduced-motion:reduce)").matches){
  function tilt(el,max){
    el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform="perspective(900px) rotateY("+(x*max)+"deg) rotateX("+(-y*max)+"deg) translateY(-4px)"});
    el.addEventListener("mouseleave",function(){el.style.transform=""});
  }
  document.querySelectorAll(".tilt,.step,.stat").forEach(function(e){tilt(e,9)});
  var hp=document.getElementById("heroPhoto"),hf=document.getElementById("heroFrame");
  hp.addEventListener("mousemove",function(e){var r=hp.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    hf.style.transform="rotateY("+(x*16)+"deg) rotateX("+(-y*14)+"deg)"});
  hp.addEventListener("mouseleave",function(){hf.style.transform=""});
}
