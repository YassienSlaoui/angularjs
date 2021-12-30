let myModule = angular.module('myFormulaireModule',['ngRoute','ngAnimate','ui.bootstrap','ngSanitize']);
sessionStorage.setItem('users',JSON.stringify([]));
sessionStorage.setItem('idUser',JSON.stringify({}))
sessionStorage.setItem('userView',JSON.stringify({}))
myModule.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/',{
        templateUrl:'content/views/home.html',       
    })
    .when('/listUsers',{
        templateUrl:'content/views/listPerson.html',
        controller:'formulaireCotroller' 
    }).when('/formulaire',{
        templateUrl:'content/views/formulaire.html',
        controller:'formulaireCotroller'        
    }).when('/formulaire/:id',{
        templateUrl:'content/views/formulaire.html',
        controller:'formulaireCotroller'        
    }).when('/view',{
        templateUrl:'content/views/view.html',
        controller:'formulaireCotroller'        
    }).otherwise({
        redirectTo:'/'
    });
}]);
myModule.controller('formulaireCotroller',['$scope','$location','$uibModal',function($scope,$location,$uibModal){
    $scope.users=JSON.parse(sessionStorage.getItem('users'))
    let a =sessionStorage.getItem('idUser')
   console.log($scope.users)
    if(a!='{}'){
        $scope.formulaire=$scope.users.find( ({ username }) => username ==JSON.parse(a) )
        $scope.formulaire.birthday=new Date($scope.formulaire.birthday.split("/").reverse().join("-"))
    }
    let b =sessionStorage.getItem('userView')
   $scope.userView={
       username:'',
       birthday:'',
       email:''
   }
    if(b!='{}'){
        $scope.userView=$scope.users.find( ({ username }) => username ==JSON.parse(b) )
    }
    console.log(location.pathname.split('/').slice(-1)[0]==='formulaire')
    $scope.addUser = function(){
        if(location.pathname.split('/').slice(-1)[0]==='formulaire'){
            let date = $scope.formulaire.birthday
            let newdate = new Date(date)
            $scope.users.push({
                username:$scope.formulaire.username,
                birthday:newdate.toLocaleDateString(),
                email:$scope.formulaire.email
            })
            
        }else{
            let date = $scope.formulaire.birthday
            
            let newdate = new Date(date)
            console.log(newdate.toLocaleDateString())
            let idUserUpdeted = $scope.users.indexOf(location.pathname.split('/').slice(-1)[0])
            $scope.users[idUserUpdeted+1]={
                username:$scope.formulaire.username,
                birthday:newdate.toLocaleDateString(),
                email:$scope.formulaire.email
            }
            console.log($scope.users)
        }
        sessionStorage.setItem('users',JSON.stringify($scope.users))
        sessionStorage.setItem('idUser',JSON.stringify({}))
            $location.path('listUsers');
    }
    $scope.remove = function(user){
        let eleRemoved = $scope.users.indexOf(user)
        $scope.users.splice(eleRemoved,1)
        sessionStorage.setItem('users',JSON.stringify($scope.users))
    }
    $scope.editById=function(id)  {
        sessionStorage.setItem('idUser',JSON.stringify(id))
        $location.path('/formulaire/'+id)
    }   
    $scope.view=function(id){
        sessionStorage.setItem('userView',JSON.stringify(id))
        $location.path('/view')
    }
    $scope.consoleShow=function(){
        console.log($scope.formulaire)
    }
    $scope.open = function () {

        $uibModal.open({
            templateUrl: 'content/views/modelPopup.html', 
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'pc',
            size: 'sm',
            /*resolve: {
                data: function () {
                return pc.data;
                }
            }*/
        });
    }; 
}]);

myModule.controller('ModalInstanceCtrl', ['$uibModalInstance',function ($uibModalInstance, data) {
    var pc = this;
    pc.data = data;
    
    pc.ok = function () {
      //{...}
      alert("You clicked the ok button."); 
      $uibModalInstance.close();
    };
  
    pc.cancel = function () {
      //{...}
      alert("You clicked the cancel button."); 
      $uibModalInstance.dismiss('cancel');
    };
  }]);
  