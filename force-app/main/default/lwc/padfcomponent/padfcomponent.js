import { LightningElement, wire, track } from 'lwc';
import getAllOpps from '@salesforce/apex/GetAllOpportunities.getAllOpps'
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import Arithmetic_FIELD from '@salesforce/schema/Opportunity.Arithmetic_Area__c';

export default class padfcomponent extends LightningElement {
    error;
    data;
    event;
    showModal = false;
    handleRecordSave = true;
    recId;
    recName;
    areDetailsVisible = false;
    areDetailsVisible1 = false;
    thimaticarea = '';
    democracy = false;
    disaster = false;
    economy = false;
    economic = false;
    education = false;
    political = false;
    
    //percArithmaticArea = true;
    @track lstSelected = [];
    @track lstArithematicArea = [];
    @track percArithmaticArea = [];

    democracyValue = 0;
    disasterValue = 0;

    connectedCallback() {
        console.log('Call back >>>>>>>');
        this.percArithmaticArea = 0;
        console.log('percArithmaticArea:' + this.percArithmaticArea);
        this.openModal();
        getAllOpps()
            .then(result => {
                console.log('result>>>>>', result);
                //  console.log('result>>>>>',result.Arithmetic_Area__c);
            })
            .catch(error => {
                console.log('Errorured:- ' + error.body.message);

            });
    }
    // Get Object Info.
    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    opportunityObjectInfo;

    // Get Picklist values.
    @wire(getPicklistValues, { recordTypeId: '$opportunityObjectInfo.data.defaultRecordTypeId', fieldApiName: Arithmetic_FIELD })
    arithematicArea(data, error) {
        if (data && data.data && data.data.values) {
            data.data.values.forEach(objPicklist => {
                console.log('objPicklist>>>', objPicklist);
                this.lstArithematicArea.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.thimaticarea = event.detail.value;
        // console.log('***this.thimaticarea***:'+this.thimaticarea);
        // console.log('***handleChange***:'+this.handleChange);

        if (this.thimaticarea.includes("Democracy")) {
            this.democracy = true;
        }
        if (this.thimaticarea.includes("Disaster")) {
            this.disaster = true;
        }
        if (this.thimaticarea.includes("Economy")) {
            this.economy = true;
        }
        if (this.thimaticarea.includes("Economic")) {
            this.economic = true;
        }
        if (this.thimaticarea.includes("Education")) {
            this.education = true;
        }
        if (this.thimaticarea.includes("Political")) {
            this.political = true;
        }
        console.log('this.percArithmaticArea>>>', this.percArithmaticArea);
    }

    handleChangeEvent(event) {
        if(this.thimaticarea != null){
            this.thimaticarea = event.detail.value;
            this.percArithmaticArea = this.thimaticarea;
           
            console.log('this.democracy:'+this.democracy);
            console.log('this.percArithmaticArea:'+this.percArithmaticArea);
            console.log('this.thimaticarea:'+this.thimaticarea);
        }else if(this.thimaticarea == null){
            this.percArithmaticArea = '';
            console.log('this.percArithmaticArea:'+this.percArithmaticArea);
        }
        // if (this.democracy === true) {
        //     this.democracyValue = event.detail.value;
        // }
        // else if (this.disaster === true) {
        //     this.disasterValue = event.detail.value;
        // }
        // this.percArithmaticArea = parseInt(this.democracyValue) + parseInt(this.disasterValue);
        // console.log('this.percArithmaticArea:'+this.democracyValue);
        // console.log('this.percArithmaticArea:'+this.disasterValue);

    }
    openModal() {
        this.showModal = true;
    }
    closeModal() {
        this.showModal = false;
    }
    handleSubmit(event) {
        const fields = event.detail.fields;
        console.log("Fields: ", fields);
        this.showModal = false;

    }
    handleCancel(event) {
        const fields = event.detail.fields;
        console.log("events:", fields);
        return true;
    }
}