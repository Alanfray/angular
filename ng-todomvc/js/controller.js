(function(angular) {
  // 2.创建控制器
  var app = angular.module('todos.controller', ['ngRoute'])
    // 配置路由规则
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:status?', {
      templateUrl: 'todoId',
      controller: 'todosController'
    })
  }])

  app.controller('todosController', [
    '$scope',
    '$location',
    '$window',
    '$routeParams',
    'Todos',
    function($scope, $location, $window, $routeParams, Todos) {
      console.log($window === window);
      console.log(Todos);
      // location
      // 是通过$location.url()方法获取锚点值，不包含#号
      console.log($location.url());
      // 功能1 显示数据列表
      // var tasks=[
      //  {id:1,name:'吃饭',completed:false},
      //  {id:2,name:'睡觉',completed:true},
      //  {id:3,name:'学习',completed:false},
      //  {id:4,name:'休息',completed:true},
      //  {id:5,name:'打球',completed:true},
      // ];
      $scope.tasks = Todos.get();

      // 功能2 添加任务
      //暴露数据模型
      $scope.newTask = '';
      $scope.add = function() {
        if (!$scope.newTask) {
          return;
        }
        Todos.add($scope.newTask);
        // 清空文本框架的值
        $scope.newTask = '';
      }

      // 功能3 删除任务
      $scope.remove = Todos.remove;

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
      $scope.$watch('tasks', function(nowValue, oldVAlue) {
        Todos.save();
      }, true); // 加上true表示  深度监听

      // 功能6 批量切换任务是否完成的状态
      $scope.isSelected = false;
      $scope.toggleAll = function() {
        Todos.toggleAll($scope.isSelected);
      }

      // 功能7 清除已完成任务
      $scope.clearCompleted = function() {

        // 尽量不要在循环中删除或添加数据中的元素。
        // for (var i = 0; i < $scope.tasks.length; i++) {
        //   // i=0 , length 5
        //   // i=1 , length 4
        //   // i=2 , length 4
        //   // i=3 , length 3
        //    var item =  $scope.tasks[i];
        //    if(item.completed){
        //      $scope.tasks.splice(i,1);
        //    }
        // }
        //
        Todos.clearCompleted();
        $scope.tasks = Todos.get();
      }

      // 功能7.1 控制清除已完成任务按钮的显示与否
      $scope.isShow = Todos.hasCompleted;

      // 功能8 显示未完成的任务数

      $scope.unCompleted = Todos.upCompleted;

      // $scope.$watch('tasks',function(){},true)
      // 第三个参数表示深度监听,会监听每一个元素的每一个属性的变化.

      // 功能9 切换不同状态任务的显示与否
      // $scope.active=function(){
      //     var tmp = [];

      //    // 将未完成的任务添加到临时数组中
      //    for (var i = 0; i < $scope.tasks.length; i++) {
      //       var item = $scope.tasks[i];
      //       if(!item.completed){
      //         tmp.push(item);
      //       }
      //    }

      //    $scope.tasks=tmp;
      // }

      // 功能9 通过filter过滤器来控制不同状态任务的显示与否
      $scope.isCompleted = {};
      // $scope.active=function(){
      //   $scope.isCompleted={completed:false}
      // }

      // $scope.completed=function(){
      //   $scope.isCompleted={completed:true}
      // }

      // $scope.all=function(){
      //   $scope.isCompleted={};//给一个不包含任何属性的对象
      // }


      // 根据url中的hash显示不同状态的任务
      // 注意为什么要将$location挂载到$scope.location属性上？
      // 原因：$watch是用来监视数据模型的值的变化的。而$lacation只是一个普通的对象，也并没有保存在数据模型当中

      //var hash = $location.url();
      // $scope.location=$location;
      // $scope.$watch('location.url()',function(nowValue,oldValue){
      //   switch(nowValue){
      //   case '/active':
      //     $scope.isCompleted={completed:false}
      //   break;
      //   case '/completed':
      //   $scope.isCompleted={completed:true}
      //   break;
      //   default:
      //     $scope.isCompleted={};
      //   break;
      // }
      // })
      //

      switch ($routeParams.status) {
        case 'active':
          $scope.isCompleted = {
            completed: false
          }
          break;
        case 'completed':
          $scope.isCompleted = {
            completed: true
          }
          break;
        default:
          $scope.isCompleted = {};
          break;
      }

    }
  ])
})(angular)