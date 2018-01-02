<!-- apply the module and controller to our body so angularjs is applied to that -->


<div ng-app="myApp" ng-controller="myCtrl" class="container">
    <h2>Horizontal form</h2>
    <form name="submit" method="post" class="form-horizontal" ng-submit="formSubmit()">
        <label >{{status}}</label>
        <div class="form-group">
            <label class="control-label col-sm-2" for="email">Name:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" ng-model="formData.name"  placeholder="Enter email" name="email">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">Mobile:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" ng-model="formData.mobile" placeholder="Enter password" name="pwd">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">Email:</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" ng-model="formData.email" placeholder="Enter password" name="pwd">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">Gender:</label>
            <div class="col-sm-10">
                Male<input type="radio" value="Male"  ng-model="formData.gender" placeholder="Enter password" name="pwd">
                Femle<input type="radio"  value="Female"  ng-model="formData.gender" placeholder="Enter password" name="pwd">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">Gender:</label>
            <div class="col-sm-10">
                Cricket<input type="checkbox" value="Male"  ng-model="formData.cricket" placeholder="Enter password" name="pwd">
                Football<input type="checkbox"  value="Female"  ng-model="formData.football" placeholder="Enter password" name="pwd">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" value="Submit" class="btn btn-default">
            </div>
        </div>
    </form>


</div>   <!-- SHOW DATA FROM INPUTS AS THEY ARE BEING TYPED -->
<script>

    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $http) {
        $scope.formData = {},
        $scope.formSubmit= function () {

            $http({
                method : "POST",
                url : "http://localhost/CodeIgniter-3.1.6/index.php/angularController/submitData",
                data: $scope.formData
            }).then(function mySuccess(response) {
                $scope.status = response.data;
            }, function myError(response) {
                $scope.status = response.statusText;
            });
        }


    });
</script>
</body>