'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);
/*
 phonecatControllers.controller('PhoneListCtrl', [ 'Phone',

 function (Phone) {
 var vm = this;
 vm.phones = Phone.query();
 vm.orderProp = 'age';
 }]);

 phonecatControllers.controller('PhoneDetailCtrl', ['$routeParams', 'Phone',
 function ($routeParams, Phone) {
 var vm = this;
 vm.phone = Phone.get({
 phoneId: $routeParams.phoneId
 },
 function(phone){
 vm.mainImageUrl = phone.images[0]
 }
 )
 vm.phoneId = $routeParams.phoneId;

 vm.setImage = function (imageUrl) {
 vm.mainImageUrl = imageUrl;
 }

 }]);*/

phonecatControllers.controller('PhoneListCtrl', [ 'Restangular',

    function (Restangular) {
        var vm = this;
        vm.phones = Restangular.all('app/phones/phones.json').getList().$object;
        vm.orderProp = 'age';
    }]);


phonecatControllers.controller('PhoneDetailCtrl', ['$routeParams', 'Restangular',
    function ($routeParams, Restangular) {
        var vm = this;
        var phoneId = $routeParams.phoneId + '.json';

        Restangular.one('app/phones', phoneId).get()
            .then(function success (phoneDetail) {
                vm.phone = phoneDetail;
                vm.mainImageUrl = phoneDetail.images[0];
                vm.phoneId = $routeParams.phoneId;
                console.log(phoneDetail);
            }, function failure(){
                alert('Oops wrong');
            });

       vm.setImage = function (imageUrl) {
            vm.mainImageUrl = imageUrl;
        }

    }]);
