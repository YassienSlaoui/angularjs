var MyFirstAngularModule = angular.module('MyFirstAngularModule',['ngRoute','ngAnimate']);
/*

MyFirstAngularModule.run(function(){

});
MyFirstAngularModule.controller(function(){

});*/

MyFirstAngularModule.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/home',{
        templateUrl:'content/views/home.html',
        controller:'myFirstConroler'
    })
    .when('/listPerson',{
        templateUrl:'content/views/listPeson.html',
        controller:'myFirstConroler'
    }).when('/contact',{
        templateUrl:'content/views/contact.html',
        controller:'myContactController'
    }).otherwise({
        redirectTo:'/home'
    });


}]);
MyFirstAngularModule.directive('directiveapp',[function(){
return {
    restrict:'E' ,// E-> element<ele></ele> A->Attribute <ele attribute=""></ele>
    scope:{
        person : '=',
        title : '='
    },
    transclude:true,
    replace:true,
    templateUrl:"content/views/random.html",
    controller:function($scope){
        $scope.random = Math.floor(Math.random() *7);
    }
}
}]);

MyFirstAngularModule.controller('myFirstConroler',function($scope,$http){
$scope.message="hello all";
$scope.remove=function(element){
    let eleRemoved = $scope.hamid.indexOf(element)
    $scope.hamid.splice(eleRemoved,1)
}
    
$scope.addPerson=function(){
    
    $scope.hamid.push({
        name:$scope.newPerson.name,
        age:$scope.newPerson.age,
        available:$scope.newPerson.available,
        picture:$scope.newPerson.picture
    })
    $scope.newPerson.name=""
    $scope.newPerson.age=0
    $scope.newPerson.available=false
}

$http.get('content/data/data.json').success(function(data){
    $scope.hamid=data
})
$scope.removeAll=function(){
    $scope.hamid=[]
}
});
MyFirstAngularModule.controller('myContactController',function($scope,$location){
    $scope.sendEmail=function(){
        $location.path('home');
    }

})