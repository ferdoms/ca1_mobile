/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// import api from './api';

var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        let test
        // (async () => {
        //     test = await ApiService.USDEUR_quote()
        //     console.log(test)
        // })()

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    onConverterChange: function () {
        (async() => {
            let amount = document.getElementById("converter").value;
            let converted = await controller.convert(amount);
            console.log(converted);

            document.getElementById("converted").innerHTML = "€ " + converted;
        })()
        
    }
};



var controller = {
   async convert(amount) {
        let quote = await ApiService.USDEUR_quote();
        
        return amount * quote;

    }
}

var ApiService = {

    fetchApi(url, options) {

        let headers = {
            Accept: "application/json"
        }

        return fetch(url, {
            ...options,
            headers
        })
            .then(messageHelper.checkStatus)
            .then((response) => response.json());

    },

    async USDEUR_quote() {
            let data = await this.fetchApi("http://www.apilayer.net/api/live?access_key=fe40a7704d42efaa29a8205882258f71");
            // let data = res.then(()=>data);
            return data.quotes.USDEUR;
    }
}

var messageHelper = {
    async checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let res = await response.json()
            let error = new Error(res['Error']);
            error.message = res['Error'];
            throw error;
        }
    }
}
