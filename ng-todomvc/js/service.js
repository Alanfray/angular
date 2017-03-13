(function(angular) {
  // 创建服务
  var app = angular.module('todos.service', []);

  // 第一个参数:也是一个名字
  // 第二个参数:类似于控制器的第二个参数,
  // 这个function最终会被当前构造函数来使用
  app.service('Todos', ['$window', function($window) {
    //        console.log($window);
    //this.name='小明';
    var storage = $window.localStorage;

    // 拿到数据
    var str = storage.getItem('todos');
    var tasks = JSON.parse(str || '[]');

    // 1.获取数据
    this.get = function() {
      return tasks;
    }

    // 2.添加数据
    this.add = function(newTask) {
      // 动态的计算id
      var id;
      if (tasks) {
        id = 1;
      } else {
        id = tasks[tasks.length - 1].id + 1;
      }
      // 添加数据到数据中
      tasks.push({
        id: id,
        name: newTask,
        completed: false
      });
      this.save();
    }

    // 3.删除数据
    var that = this;
    this.remove = function(id) {
      for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i];
        if (item.id == id) {
          // 从数组中移除数据
          tasks.splice(i, 1);
          that.save(); //需要是return前调用
          return;
        }
      }
    }

    // 保存任务
    this.save = function() {
      storage.setItem('todos', JSON.stringify(tasks));
    }

    // 6.批量切换任务的状态
    this.toggleAll = function(isSelected) {
      for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i];
        item.completed = isSelected;
      }
      this.save();
    }

    // 7.删除所有已完成任务
    this.clearCompleted = function() {
      var tmp = [];

      // 将未完成的任务添加到临时数组中
      for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i];
        if (!item.completed) {
          tmp.push(item);
        }
      }

      tasks = tmp;
      // tasks.length=0;
      // Array.prototype.push(tasks,tmp);
      this.save();
    }

    // 7.1 判断是否有已完成的任务
    this.hasCompleted = function() {
      for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i];
        if (item.completed) {
          return true;
        }
      }
      return false;
    }

    // 8 获取所有未完成的任务数
    this.upCompleted = function() {
      var count = 0;
      for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i];
        if (!item.completed) {
          count++;
        }
      }
      return count;
    }
  }])
})(angular)