@pension @tool
Feature: Can I use the 'Check your State Pension age' tool?
  I want to use the 'Check your State Pension age' tool, then confirm I received the correct answer

  Scenario: Attempt to use the tool
    Given I visit the url "state-pension-age" !
    When I click the "Start now" link *
    And I select the answer "State Pension age - including Pension Credit qualifying age" *
    And I click the "Next step" button *

    ### DO THIS ###

    # And I select the "Day" option "29" *
    # And I select the "Month" option "September" *
    # And I select the "Year" option "1983" *

    ### OR DO THIS ###

    And I select the dob "29 September 1983" *

    And I click the "Next step" button *
    And I select the answer "Man" *
    And I click the "Next step" button *

    ### DO THIS ###

    # Then it has "You’ll reach State Pension age on 29 September 2051." on the page *

    ### OR DO THIS ###

    Then it has an "h2" element with text "You’ll reach State Pension age on 29 September 2051." !
    