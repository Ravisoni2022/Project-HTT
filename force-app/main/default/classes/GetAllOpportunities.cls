public with sharing class GetAllOpportunities {
    @AuraEnabled(cacheable=true)
     public static List<Opportunity> getAllOpps(string stage) {
         return [SELECT Id, Name ,StageName, CloseDate ,Type ,Probability,Go_No_Go__c,Go_No_Go_Status__c,Amount,Opportunity_Type__c,Donor_of_Funding_source__c,Expected_Award_Mechanism__c,
                 Recipient_Country__c,Request_From_Information_ROI_Date__c,Release_date__c,PDF_Application_type__c,Overhead_Recovery__c,Cost_Center__c,Trustee_Referral__c,Arithmetic_Area__c,
                 Total_Country_Percentage__c,Primary_Contact__c,Cost_Sharing__c,Sensitive_Opportunity__c,Regional_opportunity__c,OAS_involvement__c,Proposal_Manager__c,Pre_Awarded__c,
                 Opportunity_sponsor__c,Lead_Writer__c,Budget_Owner__c,Reviewed_and_Approval_by_Finance__c,MyPADF_URL_Directory__c,Opportunity_Budget_Status__c,
                 Technical_Narrative__c,Budget_Narrative__c,Budget_Ready__c from Opportunity ];
     }
 }