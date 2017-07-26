var hwApp = angular.module('Homework', []);

hwApp.controller('HomeworkController', ['$scope', 'tasks', function($scope, tasks){
    
    $scope.listTasks = tasks;
    $scope.remove = function(){
        var finished = 0;
        var percFin = 0.0;
        angular.forEach($scope.listTasks, function(x){ 
            if(x.done){
                finished++;            
            };
        });
        percFin = finished / $scope.listTasks.length;
        progBar()
        console.log(percFin);
        finished = 0;
    };
    
}])
.factory('tasks', [function(){
    var tasklist = [];
    var randlist = [];    
    var ranNums = [];
    
    for(var i=0;i<10;i++){
        var todoName = "Task # " + i;
        tasklist.push({todo:todoName, done:false});
    }
    
    for(var j=0;ranNums.length < 4;j++){ 
        ranNum = Math.floor(Math.random()*10);
        if(tasklist[ranNum]){            
            delete tasklist[ranNum]; 
            ranNums.push(ranNum);
        } 
    }
    
    for(var k=0;k<tasklist.length;k++){

            if(tasklist[k]){
                randlist.push(tasklist[k]);
            }
        }

    return randlist;
}])
.directive('progBar', ['$document', function($document) {
  return {
    restrict: 'E',
    template: '<div><div id="circle"></div><span>{{whatsleft}}</span></div>',
    link: function($scope,element,attrs){
        $scope.whatsleft = $scope.listTasks.length;
        $('#circle').circleProgress({
            value: 0,
            size: attrs.size
        });
        
        $scope.whatsleft = $scope.listTasks.length;
        $scope.finish = function(){
            var finished = 0;
            var percFin = 0.0;
            angular.forEach($scope.listTasks, function(x){                 
                if(x.done){
                    finished++;            
                };
            });
            percFin = finished / $scope.listTasks.length;
            $('#circle').circleProgress({
                value: percFin
            });
            $scope.whatsleft=($scope.listTasks.length - finished);
            console.log(percFin);
        };
        
      
    }
  };
}]) ;