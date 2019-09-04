@pension @search
Feature: Can I search for 'pensions', and navigate from there?
  I want to go search for the word 'pensions', get a list of results, click the one I want, then confirm I have reached the correct page

  Scenario: Attempt to search for 'pensions'
    Given I visit the url "https://www.gov.uk" *
    When I enter "pensions" in the "1st" search field *
    Then I click the "Search" button *
    Then I click the "Check your State Pension age" link *
    Then it has a page title "Check your State Pension age - GOV.UK" *
