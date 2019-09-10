@browser @pension
Feature: Can I navigate to the 'Check your State Pension age' page?
  I want to go to a url, click a link, then confirm I have reached the correct page

  Scenario: Attempt to navigate to the page
    Given I visit the url "https://www.gov.uk/" *
    When I click the "Working, jobs and pensions" link *
    Then it has a page title "Working, jobs and pensions - GOV.UK" *
