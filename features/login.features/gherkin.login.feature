Feature: Login

  Scenario: User logs in successfully
    Given I open the login page
    When I submit valid credentials
    Then I should see the homepage
