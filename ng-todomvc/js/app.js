(function(angular) {
  'use strict';

  // Your starting point. Enjoy the ride!
  //name='小明'

  // 1.创建模块
  var app = angular.module('todos', []);
  // 2.创建控制器
  app.controller('todosController', 
    ['$scope','$location',function($scope,$location) {
    // 功能1 显示数据列表
    var tasks = [{
      id: 1,
      name: '吃饭',
      completed: false
    }, {
      id: 2,
      name: '睡觉',
      completed: true
    }, {
      id: 3,
      name: '学习',
      completed: false
    }, {
      id: 4,
      name: '休息',
      completed: true
    }, {
      id: 5,
      name: '打球',
      completed: true
    }, ];
    $scope.tasks = tasks;

    // 功能2 添加任务
    //暴露数据模型
    $scope.newTask = '';
    $scope.add = function() {
      if (!$scope.newTask) {
        return;
      }
      // 动态的计算id
      var id;
      if ($scope.tasks.length === 0) { //不能像视频中写判断条件if(!$scope.tasks)
        id = 1;
      } else {
        id = $scope.tasks[$scope.tasks.length - 1].id + 1;
      }
      // 添加数据到数据中
      $scope.tasks.push({
        id: id, //视频中的id写错了
        name: $scope.newTask,
        completed: true
      });
      // 清空文本框架的值
      $scope.newTask = '';
    }

    // 功能3 删除任务
    $scope.remove = function(id) {
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (item.id == id) {
          // 从数组中移除数据
          $scope.tasks.splice(i, 1);
          return;
        }
      }
    }

    // 功能4 修改任务
    //暴露数据模型
    $scope.isEditingId = -1;
    $scope.edit = function(id) {
      console.log(1);
      $scope.isEditingId = id;
    }
    $scope.save = function() {
      $scope.isEditingId = -1;
    }

    // 功能5 切换任务是否完成的状态
    // 不需要写任务js代码
    //

    // 功能6 批量切换任务是否完成的状态
    $scope.isSelected = false;
    $scope.toggleAll = function() {
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        item.completed = $scope.isSelected;
      }
    }

    // 功能7 清除已完成任务
    $scope.clearCompleted = function() {

      // 不要在循环中删除或添加数据中的元素。
      // for (var i = 0; i < $scope.tasks.length; i++) {
      //   // i=0 , length 5
      //   // i=1 , length 4
      //   // i=2 , length 4
      //   // i=3 , length 3   此时循环跳出，但是我数据并没有遍历完
      //    var item =  $scope.tasks[i];
      //    if(item.completed){
      //      $scope.tasks.splice(i,1);
      //    }
      // }
      //
      var tmp = []; // 专门用来存放completed为false的任务

      // 将未完成的任务添加到临时数组中
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (!item.completed) {
          tmp.push(item);
        }
      }

      $scope.tasks = tmp;
    }

    // 功能7.1 控制清除已完成任务按钮的显示与否
    $scope.isShow = function() {
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (item.completed) {
          return true;
        }
      }
      return false;
    }

    // 功能8 显示未完成的任务数

    $scope.unCompleted = function() {
      var count = 0;
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (!item.completed) {
          count++;
        }
      }
      return count;
    }

    // $scope.$watch('tasks',function(){},true)
    // 第三个参数表示深度监听,会监听每一个元素的每一个属性的变化.

      //功能9 fillter
    //$scope.isCompleted={};
    // $scope.active=function(){
    //   $scope.isCompleted={completed:false};
    // }
    // $scope.completed=function(){
    //   $scope.isCompleted={completed:true};
    // }
    // $scope.all=function(){
    //   $scope.isCompleted={};
    // }
    //根据url中的hash显示的不同状态来判断
    //var hash = $location.url();
    //console.log($location.url());

    //锚点
    $scope.isCompleted={};
    $scope.location=$location;
    $scope.$watch('location.url()',
      function(nowValue,oldValue){
      switch (nowValue){
      case '/active':
      $scope.isCompleted={completed:false}
      break;
      case '/completed':
      $scope.isCompleted={completed:true}
      break;
      case '/all':
      $scope.isCompleted={}
      break;
    } 
    })

  }])
})(angular);