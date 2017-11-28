// Code goes here

(function() {
  var app = angular.module('testExample', ["ngRoute"])
  app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "employee.html"
      })
      .when("/employee/add", {
        templateUrl: "add.html"
      })
      .when("/employee/:id/edit", {
        templateUrl: "add.html"
      })
  });
  app.controller('MyController', ['$scope', 'notify', '$location', '$routeParams', function($scope, notify, $location, $routeParams) {
    $scope.btnClick = btnClick;
    $scope.empList = notify.getEmp()
    $scope.id = $routeParams.id
    console.log($scope.id)
    if ($scope.id) {
      $scope.emp = notify.getEmpById($scope.id)
    }
    // $scope.show = show;
    $scope.addEmp = addEmp;
    $scope.edit = edit;
    $scope.editEmp = editEmp;
    $scope.back = function(){
      $location.path('/');
    }

    function btnClick() {
      $location.path('/employee/add')
    }

    function addEmp(emp) {
      console.log('addEmp')
      // notify.addEmp(emp)
      $scope.empList = notify.getEmp()
      $location.path('/')
    }

    function edit(id) {
      $scope.emp = notify.getEmpById(id)
      $location.path('/employee' + "/" + id + "/" + "edit")
    }
    
    function editEmp(emp,id){
      notify.editEmp(emp,id);
      $location.path('/')
    }

  }]);

  app.factory('notify', ['$window', function(win) {
    var msgs = [];
    var emp = {}
    var list = [{
      "id": 1,
      "name": 'john',
      "phone": 9999999,
      "address": {
        "city": 'pune',
        "address_line1": 'ABC road',
        "address_line2": 'xyz building',
        "postalCode": 451112
      }
    }, {
      "id": 2,
      "name": 'Jacob',
      "phone": '3544313',
      "address": {
        "city": 'pune',
        "address_line1": 'PQR road',
        "address_line2": 'ABC building',
        "postalCode": 451112
      }
    }, {
      "id": 3,
      "name": 'Ari',
      "phone": 1234566789,
      "address": {
        "city": 'Mumbai',
        "address_line1": 'PQR road',
        "address_line2": 'ABC building',
        "postalCode": 451112
      }
    }];
    return {
      getEmp: getEmp,
      addEmp: addEmp,
      getEmpById: getEmpById,
      editEmp: editEmp

    };

    function getEmp() {
      console.log('emp');
      return list;
    }

    function addEmp(emp) {
      emp.id = list.length + 1;
      if (!emp.address) {
        emp.address = {}
        emp.address.city = 'NA'
        emp.address.address_line1 = 'NA'
        emp.address.address_line2 = 'NA'
        emp.address.postalCode = 'NA'
      }
      list.push(emp);
      console.log(list)
    }

    function getEmpById(id) {
      emp = list[id]
      return emp;
    }

    function editEmp(emp, index) {
      list[index].name = emp.name
      list[index].phone = emp.phone
    }

  }]);
  // 
}());