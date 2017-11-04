import angular from 'angular'
import 'angular-ui-router'
import 'pdfmake'
angular.module('studentApp', ["ui.router","pdfmake"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/studentInfo')

  $stateProvider
    .state('studentInfo', {
      url: '/studentInfo',
      templateUrl: 'students/students-nav.html',
      resolve: {
        studentsService: function($http) {
          return $http.get('/studentInfo');
        }
      },
      controller: function(studentsService, $location) {
        this.students = studentsService.data;
      },
      controllerAs: 'studentsCtrl'
      })
    .state('studentInfo.marks', {
        url: '/:studentEnroll',
            templateUrl: 'students/student-marks.html',
                resolve: {
                    markService: function($http, $stateParams) {
                       return $http.get('/studentInfo/${$stateParams.studentEnroll}');
                              }
                       },
                    controller: function(markService){
                            this.mark = markService.data;
                            this.savePdf = function(){
                              pdfMake.createPdf({ content: 'This is an sample PDF printed with pdfMake' }).download('optionalName.pdf');
                            };
                               },
                    controllerAs: 'marksCtrl'
            })
     .state('studentInfo.new', {
              url : '/:studentEnroll/marks/new',
              templateUrl : 'students/new-marks.html',
              controller : function($stateParams, $state, $http){
                this.marksEnroll = $stateParams.studentEnroll;
                this.saveMarks = function(marks){
                        $http({method: 'POST', url: `/studentInfo/${$stateParams.studentEnroll}/marks`, data: {marks} }).then(function(){
                        $state.go('studentInfo.marks', {studentEnroll : $stateParams.studentEnroll});
                });
               
                };
              },
              controllerAs : 'newMarksCtrl'
            })
      .state('studentInfo.newStudent', {
        url : '/new-Student',
        templateUrl: 'students/new-student.html',
        controller : function($stateParams, $state, $http){
            this.saveStudent = function(student){
                        $http({method: 'POST', url: `/studentInfo/new-student`, data:{student}}).then(function(){
                        $state.go('studentInfo');
                });
               
                };
              },
              controllerAs : 'newStudentCtrl'
            })
      })                 