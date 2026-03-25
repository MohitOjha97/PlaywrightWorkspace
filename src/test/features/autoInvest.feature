@investScenario
Feature: Invest

    @investScenario1
    Scenario: InvestScenario1;Invest Scenario Test with No Monthly Contribution, High interest Debt , spare money , Protective risk
        Given User is on landing page
        And Validate Need to Know confirmation text list to be displayed
        And User clicks on Next button
        Then Knowlegde page should be displayed
        And User selects their Experience with investing as "I'm investor and can invest confidently"
        And User clicks on Next button
        Then Personal Contributions page should be displayed
        And User should be able to update Initial one off payment value as "500"
        And User should be able to update ongoing monthly contributions value as "0"
        And User clicks on Next button
        Then Affordability Page should be displayed
        Then Valid error message should be displayed when no option is selected
        And User selects option for Emergeny fund as "Yes" and has debt as "Yes" and has spare money as "Yes"
        Then User clicks check button
        Then User fills below details in Affordibility calculator section
            | Input              | Value |
            | Monthly net income | 1     |
            | Monthly outgoing   | 0     |
            | Liquid assets      | 510   |
            | Total debts        | 1     |
        Then User click on Calculate button
        Then Good to go page banner be displayed
        And User clicks on Next button
        Then Investment Theme page should be displayed
        And User should be able to select how would you like to manage your investments option as "Index"
        And Validate Cost of investments percent value for index investment option in range from "0.12" to "0.19"
        And Validate how would you like to manage your investments Find out More Section
        And User clicks on Next button
        Then Risk level page should be displayed
        And User clicks Complete risk questionnaire button
        And User should be able to answer the risk questionnaire
            | Input     | Value             |
            | Question1 | Disagree          |
            | Question2 | Agree             |
            | Question3 | Strongly agree    |
            | Question4 | Strongly disagree |
            | Question5 | Strongly disagree |
            | Question6 | Strongly disagree |
            | Question7 | Strongly disagree |
        
    @investScenario2
    Scenario: Investment2;Invest Scenario Test with less Monthly Contribution, Low interest Debt , No spare money , Cautious risk
        Given User is on landing page
        And Validate Need to Know confirmation text list to be displayed
        And User clicks on Next button
        Then Knowlegde page should be displayed
        And User selects their Experience with investing as "I'm a keen investor and can invest confidently"
        And User clicks on Next button
        Then Personal Contributions page should be displayed
        And User should be able to update Initial one off payment value as "1000"
        And User should be able to update ongoing monthly contributions value as "100"
        And User clicks on Next button
        Then Affordability Page should be displayed
        Then Valid error message should be displayed when no option is selected
        And User selects option for Emergeny fund as "No" and has debt as "No" and has spare money as "No"
        And User clicks check button
        Then User fills below details in Affordibility calculator section
            | Input              | Value |
            | Monthly net income | 500   |
            | Monthly outgoing   | 350   |
            | Liquid assets      | 2500  |
            | Total debts        | 0     |
        Then User click on Calculate button
        Then Good to go page banner be displayed
        And User clicks on Next button
        Then Investment Theme page should be displayed
        And User should be able to select how would you like to manage your investments option as "Index"
        And Validate Cost of investments percent value for index investment option in range from "0.12" to "0.19"
        And Validate how would you like to manage your investments Find out More Section
        And User clicks on Next button
        Then Risk level page should be displayed
        And User should be able to select the risk level as "2"
        
