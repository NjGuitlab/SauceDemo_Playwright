Feature: login to SauceDemo

Scenario: successful login

        Given I go to SauceDemo
        When  I put my "standard_user" and "secret_sauce"
        Then I am connected to SauceDemo

Scenario: Echec connexion-Incorrect Password 

        Given I go to SauceDemo
        When  I put my "standard_user" and "secret_sau"
        Then I get an error message

Scenario: Echec connexion-Incorrect Username 

        Given I go to SauceDemo
        When  I put my "stand_user" and "secret_sau"
        Then I get an error message

Scenario: Logout from application

        Given I go to SauceDemo
        When  I put my "standard_user" and "secret_sauce"
        Then I am connected to SauceDemo
        When I click on Logout 
        Then I should be logout 




        




    