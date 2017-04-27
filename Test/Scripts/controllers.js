angular.module("TestApp.controllers", ['ui.bootstrap'])
.controller("MainController", function ($scope, OwnerService) {

    $scope.propertyName = 'Table_ID';
    $scope.reverse = true;

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }


    $scope.pageSize = 3;
    $scope.IsNewRecord = 1; //The flag for the new record
    $scope.currentPage = 2;
    $scope.message = "All Owners";

    loadRecords();

    function loadRecords() {
        var promiseGet = OwnerService.getOwners(); //The MEthod Call from service

        promiseGet.then(function (pl) { $scope.OwnerMasters = pl.data },
              function (errorPl) {
                  $log.error('failure loading Pet', errorPl);
              });
    }

    //The Save scope method use to define the Owner object.
    //In this method if IsNewRecord is not zero then Update Owner else 
    //Create the Owner information to the server
    $scope.save = function () {
        var OwnerMaster = {
            Owner_No: $scope.Owner_No,
            Table_ID: $scope.Table_ID,
            Count: $scope.Count
        };
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = OwnerService.post(OwnerMaster);
            promisePost.then(function (pl) {
                $scope.Owner_No = pl.data.Owner_No;
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = OwnerService.put($scope.Owner_No, OwnerMaster);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }



    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = OwnerService.delete($scope.Owner_No);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.Owner_No = 0;
            $scope.Table_ID = "";
            $scope.Count = null;

            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Single Employee based on EmpNo
    $scope.get = function (Emp) {
        var promiseGetSingle = OwnerService.get(Emp.Owner_No);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Owner_No = res.Owner_No;
            $scope.Table_ID = res.Table_ID;
            $scope.Count = res.Count;

            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Pet', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.Owner_No = 0;
        $scope.Table_ID = "";
        $scope.Count = null;
    }
    //end mainController
})
    .controller("OwnerDetailsController", function ($scope, OwnerDetailsService, OwnerService, $routeParams) {
       
        $scope.propertyName = 'Item_Name';
        $scope.reverse = true;
    
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        }

        $scope.pageSize = 3;
        $scope.IsNewRecord = 1; //The flag for the new record
        $scope.currentPage = 2;
        $scope.message = "All Pets";
        $scope.QTY = 1;


        var id = $routeParams.id;

        OwnerService.get(id).then(function (d) {
            $scope.Title = d.data.Table_ID;
        })

        OwnerService.get(id).then(function (d) {
            $scope.Owner_No = d.data.Owner_No;
        })

        OwnerService.get(id).then(function (d) {
            d.data.Count = $scope.totalQTY;
            OwnerService.put(id, d.data);

        })

        loadRecords();

        function loadRecords() {
            var promiseGet = OwnerDetailsService.getOwnerDetails(id); //The MEthod Call from service



            promiseGet.then(function (pl) {
                $scope.OwnerDetails = pl.data
                $scope.totalQTY = $scope.OwnerDetails.length;
            },
                  function (errorPl) {
                      $log.error('failure loading Pet', errorPl);
                  });

            

            //for (count = 0; count < $scope.OwnerDetailDisp.length; count++) {
            //    //$scope.totalPrice += parseInt($scope.OwnerDetailDisp[count].Price);
            //    $scope.totalQty += ($scope.OwnerDetailDisp[count].QTY);
            //}
        }

        //The Save scope method use to define the Owner object.
        //In this method if IsNewRecord is not zero then Update Owner else 
        //Create the Owner information to the server
        $scope.save = function () {
            var OwnerDetail = {
                Owner_detail_No: $scope.Owner_detail_No,
                Owner_No: $scope.Owner_No,
                Item_Name: $scope.Item_Name,
                QTY: $scope.QTY
            };
            //If the flag is 1 the it si new record
            if ($scope.IsNewRecord === 1) {
                var promisePost = OwnerDetailsService.post(OwnerDetail);
                promisePost.then(function (pl) {
                    $scope.Owner_detail_No = pl.data.Owner_detail_No;
                    loadRecords();
                }, function (err) {
                    console.log("Err" + err);
                });
            } else { //Else Edit the record
                var promisePut = OwnerDetailsService.put($scope.Owner_detail_No, OwnerDetail);
                promisePut.then(function (pl) {
                    $scope.Message = "Updated Successfuly";
                    loadRecords();
                }, function (err) {
                    console.log("Err" + err);
                });
            }



        };

        //Method to Delete
        $scope.delete = function (Owner_detail_No) {
            var promiseDelete = OwnerDetailsService.delete($scope.Owner_detail_No);
            promiseDelete.then(function (pl) {
                $scope.Message = "Deleted Successfuly";
                $scope.Owner_detail_No = 0;
                $scope.Owner_No = null;
                $scope.Item_Name = "";
                $scope.QTY = null;

                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

        //Method to Get Single Employee based on EmpNo
        $scope.get = function (Emp) {
            var promiseGetSingle = OwnerDetailsService.get(Emp.Owner_detail_No);

            promiseGetSingle.then(function (pl) {
                var res = pl.data;
                $scope.Owner_detail_No = res.Owner_detail_No;
                $scope.Owner_No = res.Owner_No;
                $scope.Item_Name = res.Item_Name;
                $scope.QTY = res.QTY;

                $scope.IsNewRecord = 0;
            },
                      function (errorPl) {
                          console.log('failure loading Pet', errorPl);
                      });
        }
        //Clear the Scopr models
        $scope.clear = function () {
            $scope.IsNewRecord = 1;
            $scope.Owner_detail_No = 0;
            $scope.Owner_No = id;
            $scope.Item_Name = null;
            $scope.QTY = 1;
        }




        // END of OWnerDetail

    })
        .filter('startFrom', function () {
            return function (data, start) {
                if (!data || !data.length) { return; }
                start = +start; //parse to int
                return data.slice(start);
            }
        })
.service("OwnerService",  function ($http) {

    //Create new record
    this.post = function (OwnerMaster) {
        var request = $http({
            method: "post",
            url: "/api/OwnerMastersAPI/PostOwnerMaster/",
            data: OwnerMaster
        });
        return request;
    }

    //Get Single Record
    this.get = function (Owner_No) {
        return $http.get("/api/OwnerMastersAPI/GetOwnerMaster/" + Owner_No);
    }


    //Get All Owners
    this.getOwners = function () {
        return $http.get("/api/OwnerMastersAPI/GetOwnerMasters/");
    }

    //Update the Record
    this.put = function (Owner_No, OwnerMaster) {
        var request = $http({
            method: "put",
            url: "/api/OwnerMastersAPI/PutOwnerMaster/" + Owner_No,
            data: OwnerMaster
        });
        return request;
    }
    //Delete the Record
    this.delete = function (Owner_No) {
        var request = $http({
            method: "delete",
            url: "/api/OwnerMastersAPI/DeleteOwnerMaster/" + Owner_No
        });
        return request;
    }
    //End of OWnerService
})
.service("OwnerDetailsService", function ($http) {

    //Create new record
    this.post = function (OwnerDetail) {
        var request = $http({
            method: "post",
            url: "/api/OwnerDetailsAPI/PostOwnerDetail",
            data: OwnerDetail
        });
        return request;
    }

    //Get Single Record
    this.get = function (Owner_detail_No) {
        return $http.get("/api/OwnerDetailsAPI/GetOwnerDetailer/" + Owner_detail_No);
    }


    //Get All OwnerDetails
    //this.getOwnerDetails = function () {
    //    return $http.get("/api/OwnerDetailsAPI/");
    //}

    this.getOwnerDetails = function (id) {
        return $http.get("/api/OwnerDetailsAPI/GetOwnerDetails/" + id);
    }

    //Update the Record
    this.put = function (Owner_detail_No, OwnerDetail) {
        var request = $http({
            method: "put",
            url: "/api/OwnerDetailsAPI/PutOwnerDetail/" + Owner_detail_No,
            data: OwnerDetail
        });
        return request;
    }
    //Delete the Record
    this.delete = function (Owner_detail_No) {
        var request = $http({
            method: "delete",
            url: "/api/OwnerDetailsAPI/DeleteOwnerDetail/" + Owner_detail_No
        });
        return request;
    }
    //End of OWnerService
})

