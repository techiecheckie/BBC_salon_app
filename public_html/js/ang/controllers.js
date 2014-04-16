'use strict';


/* Controllers */

angular.module('myApp.controllers', []).
        controller('mainCTRL', function($scope, $rootScope) {
            //ga('send', 'pageview', 'idle view');
            tracker.sendAppView('Idle View');



            var repeatf;

            
                $(document).idle({
                    onIdle: function() {
                        if (idleview === true) {
                        $('.dynaDiv').animate({height: '360px'});
                        $('.midSized').animate({width: '44%'});
                        startAnimation();
                        console.log("animation started");
                        $rootScope.cancel();
                        tracker.sendAppView('Idle View');
                    }},
                    idle: 60000
                });
            
            var idleview;

            var permitted = true;
            function gAnalytics(permitted) {
                service.getConfig().addCallback(
                        /** @param {!analytics.Config} config */
                                function(config) {

                                    config.setTrackingPermitted(permitted);
                                    // If "permitted" is false the library will automatically stop
                                    // sending information to Google Analytics and will persist this
                                    // behavior automatically.
                                });
                    }
            ;

            var repeatbol = false;
            $(".overlay").click(function() {
                idleview = true;
                gAnalytics(true);
                function clrT() {
                    clearTimeout(repeatf)
                }
                ;
                clrT();
                $(".cta").css({visibility: "hidden"});
                $(".overlay").css({visibility: "hidden"});
                $(".cta").stop(true, true);

            });



            function ctaAnimation() {
                idleview=false;
                gAnalytics(false);
                $(".cta").css({visibility: "visible", bottom: "0", left: "0"}).delay(2000).animate({opacity: 1.0}, 2000);


                $(".cta").animate({
                    left: "40%",
                    bottom: "68%"

                }, 3000);

                $(".cta").animate({
                    width: "150px"
                }, 500, function() {

                    $("#promos").click();
                });

                $(".cta").animate({
                    width: "210px"
                }, 500);

                $(".cta").animate({
                    left: "40%",
                    bottom: "14%"

                }, 2000);


                $(".cta").delay(2500).animate({
                    width: "150px"
                }, 500, function() {

                    $(".repCat").click();
                });

                $(".cta").animate({
                    width: "210px"
                }, 500);


                $(".cta").animate({
                    left: "40%",
                    bottom: "3%"

                }, 1000);

                $(".cta").delay(5000).animate({
                    width: "150px"
                }, 500, function() {

                    $(".miniProducts>img").click();
                });

                $(".cta").animate({
                    width: "210px"
                }, 500);

                $(".cta").animate({
                    left: "20%",
                    bottom: "-6%"

                }, 1000);

                $(".cta").delay(2500).animate({
                    width: "150px"
                }, 500, function() {

                    $(".paulMini").click();
                });

                $(".cta").animate({
                    width: "210px"
                }, 500);

                $(".cta").animate({
                    left: "82%",
                    bottom: "-6%"

                }, 500);

                $(".cta").delay(2500).animate({
                    width: "150px"
                }, 500, function() {

                    $(".wellaMini").click();
                });

                $(".cta").animate({
                    width: "210px"
                }, 500, function() {
                    $(".cta").animate({opacity: 0.0}, 1000);
                    $('.dynaDiv').delay(9000).animate({height: '360px'});
                    $('.midSized').animate({width: '44%'});

                });



                repeatbol = true;
                repeatf = setTimeout(function() {
                    ctaAnimation();
                }, 50000);

            }
            ;

            if (repeatbol === false) {
                console.log("starter");
                ctaAnimation();
            }
            else {
                //repeat();
            }

            function startAnimation() {
                $(".overlay").css({visibility: "visible"});
                ctaAnimation();
            }


            $scope.format = ' h:mm:ss a';
            $scope.blood_1 = 100;
            $scope.blood_2 = 120;
            var stop;
            $scope.fight = function() {
                stop = $timeout(function() {
                    if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
                        $scope.blood_1 = $scope.blood_1 - 3;
                        $scope.blood_2 = $scope.blood_2 - 4;
                        $scope.fight();
                    } else {
                        $timeout.cancel(stop);
                    }
                }, 100);
            };

            $scope.stopFight = function() {
                $timeout.cancel(stop);
            };

            $scope.resetFight = function() {
                $scope.blood_1 = 100;
                $scope.blood_2 = 120;
            };
            $scope.resetApp = function() {
                tracker.sendAppView('Idle view');

                $('.dynaDiv').animate({height: '360px'});
                $('.midSized').animate({width: '44%'});

            };



            $('.dynaDiv').click(function(event) {



                if (event.target.id === "resetButton") {
                    return;
                }

                $('.dynaDiv').not(this).animate({height: '150px'});
                $(this).animate({height: '1000px'});
                if ($(this).hasClass("midSized")) {
                    $(this).animate({width: '79%'});
                    $('.midSized').not(this).animate({width: '9%', height: '1000px'});
                } else {
                    $('.midSized').animate({width: '44%', height: '150px'});
                }



            });
        })
                .controller('promotionCTRL', function($scope, $rootScope) {
                    //ga('send', 'pageview', 'promo category view');
                    var counter = 0;
                    $scope.myInterval = 5000;
                    $scope.products = [
                        'img/promos/idle1.png',
                        'img/promos/idle2.png',
                        'img/promos/idle3.jpg'
                    ];

                    $scope.showExpanded = function() {
                        $scope.promoPivot = 'expanded';
                        tracker.sendAppView("PromotionsExpanded");
                    };


                    $rootScope.openDesigners = function() {
                        $('#Promotions').click();
                        $scope.promoPivot = 'designers';
                        tracker.sendAppView("Designers");
                    };

                    /*$scope.openPhotoBooth = function() {
                     $scope.promoPivot = 'photobooth';            
                     };*/

                    $scope.openPromos = function() {
                        $scope.promoPivot = 'promos';
                        tracker.sendAppView("PromotionsOpenpromos");
                        //ga('send', 'pageview', 'promotions view');

                    };

                    $scope.showSelector = function() {

                        $scope.promoPivot = 'expandedMini';
                    };

                    $(function() {

                        $("#Promotions").resize(function( ) {
                            if ($(this).height() <= 150) {
                                $scope.$apply(function() {
                                    $scope.promoPivot = 'mini';

                                });

                            } else if ($(this).height() === 360) {
                                $scope.$apply(function() {
                                    $scope.promoPivot = 'normal';

                                });

                            }
                        });


                    });

                })

                .controller('nioxinCTRL', function($scope, $http, $modal, $rootScope) {
                    $scope.productFilter = {};
                    // tracker.sendAppView("Nioxin Modal");
                    //  tracker.sendEvent('Nioxin', 'product clicked', );
                    //ga('send', 'pageview', 'nioxin view');

                    $scope.backToNCat = function() {
                        $scope.productsPivot = 'nioxinExpanded';
                        tracker.sendAppView("Nioxin Categories");


                    };
                    $scope.openN = function(product) {

                        //ga('send', 'pageview', 'nioxin modal');
                        tracker.sendAppView("Nioxin modal");
                        tracker.sendEvent('Nioxin', 'product clicked', product.name);

                        var modalInstance = $modal.open({
                            templateUrl: 'partials/products/nioxinModal.html',
                            controller: ModalInstanceCtrl,
                            resolve: {
                                items: function() {
                                    return product;
                                }
                            }
                        });

                    };
                    $scope.setNFilter = function(filter) {
                        $scope.productFilter.category = filter.cat;
                        $scope.currentCategory = filter;
                        tracker.sendEvent('Nioxin', 'filter clicked', filter.cat);

                    };
                    $scope.myInterval = 2500;

                    $scope.showProductInNCat = function(data) {

                        tracker.sendAppView("Nioxin Products");
                        tracker.sendEvent('Nioxin', 'category clicked', data.cat);

                        $scope.productsPivot = 'nioxinProducts';
                        $scope.productFilter.category = data.cat;
                        $scope.currentCategory = data;


                    };
                    $scope.expandNProducts = function() {
                        $scope.productsPivot = 'nioxinExpanded';
                        $http.get('js/data/products.json').success(function(data) {
                            $scope.products = data.nioxinProducts;
                            $scope.cats = data.nioxinCat;
                            tracker.sendAppView("Nioxin Category");

                        });

                    };
                    var ModalInstanceCtrl = function($scope, $modalInstance, items) {
                        $(function() {
                            if (items.videos) {
                                $scope.currentVideo = items.videos[0].url;
                                console.log(items.videos[0].name);

                                tracker.sendEvent('video', 'viewed', items.videos[0].name);

                            }
                            ;

                        });
                        $scope.item = items;

                        $scope.changeBuy = function() {
                            $scope.nioxinMPivot = 'buyThis';
                        };
                        $scope.changeShare = function() {
                            $scope.nioxinMPivot = 'shareThis';
                        };

                        $scope.changeVid = function(vid) {

                            $scope.currentVideo = vid.url;
                            tracker.sendEvent('video', 'viewed', vid.name);

                        };


                        $scope.ok = function() {
                            tracker.sendAppView("Nioxin Products");

                            $modalInstance.close();
                        };

                        $rootScope.cancel = function() {
                            if ($scope.productsPivot === "MproductDisplay") {

                            }
                            else {


                            }


                            $modalInstance.dismiss('cancel');
                        };
                    };

                    $(function() {
                        $("#nioxin").resize(function( ) {
                            if ($(this).height() <= 150) {
                                $scope.$apply(function() {
                                    $scope.productsPivot = 'mini';
                                });
                            } else if ($(this).height() === 360) {
                                $scope.$apply(function() {
                                    $scope.productsPivot = 'normal';

                                });

                            }
                        });
                    });

                })

                .controller('repcharge', function($scope, $http, $modal, $rootScope) {
                    $scope.productFilter = {};
                    //ga('send', 'pageview', 'repechage view');

                    $http.get('js/data/products.json').success(function(data) {
                        $scope.products = data.repProducts;
                        $scope.cats = data.repChargeCat;
                    });

                    $scope.showproducts = function(cat) {
                        $scope.repchargePivot = 'products';
                        $scope.productFilter.category = cat;

                        tracker.sendEvent('Repechage', 'category clicked', cat);
                        tracker.sendAppView("Repechage products");

                    };

                    $scope.showCat = function() {
                        $scope.repchargePivot = 'expanded';
                        tracker.sendAppView("Repechage category");

                    };

                    $scope.setFilter = function(filter) {
                        tracker.sendEvent('Repechage', 'filter clicked', filter);

                        $scope.productFilter.category = filter;
                    };


                    $scope.open = function(product) {
                        //ga('send', 'pageview', 'repechage modal');

                        tracker.sendAppView("Repechage modal");
                        tracker.sendEvent('Repechage', 'product clicked', product.name);

                        var modalInstance = $modal.open({
                            templateUrl: 'partials/repcharge/repModal.html',
                            controller: ModalInstanceCtrl,
                            resolve: {items: function() {
                                    return product;
                                }
                            }
                        });

                    };
                    var ModalInstanceCtrl = function($scope, $modalInstance, items) {
                        $scope.changeBuy = function() {
                            $scope.repMPivot = 'buyThis';
                        };
                        $scope.changeShare = function() {
                            $scope.repMPivot = 'shareThis';
                        };
                        $scope.item = items;

                        $scope.ok = function() {
                            tracker.sendAppView("Repechage products");
                            $modalInstance.close();
                        };

                        $rootScope.cancel = function() {


                            $modalInstance.dismiss('cancel');
                        };
                    };

                    $(function() {

                        $("#repechage").resize(function( ) {
                            if ($(this).height() <= 150) {
                                $scope.$apply(function() {
                                    $scope.repchargePivot = 'mini';

                                });

                            } else if ($(this).height() === 360) {
                                $scope.$apply(function() {
                                    $scope.repchargePivot = 'normal';

                                });

                            }
                        });


                    });

                })

                .controller('wellaCTRL', function($scope, $http, $modal, $rootScope) {

                    $scope.expand = function() {
                        tracker.sendAppView("Wella Products");
                    };     //ga('send', 'pageview', 'wella view');
                    $scope.paulMitchell;
                    $scope.desin = {};
                    $scope.open = function(item) {
                        //ga('send', 'pageview', 'wella modal');
                        tracker.sendAppView("Wella modal");

                        tracker.sendEvent('Wella', 'product clicked', item.names);
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/wella/modal.html',
                            controller: ModalInstanceCtrl,
                            resolve: {
                                wellaProduct: function() {
                                    return item;
                                }
                            }});

                    };

                    var ModalInstanceCtrl = function($scope, $modalInstance, wellaProduct) {

                        $scope.item = wellaProduct;
                        $scope.changeBuy = function() {
                            $scope.wellaModalPivot = 'buyThis';
                        };
                        $scope.changeShare = function() {
                            $scope.wellaModalPivot = 'shareThis';
                        };
                        $scope.ok = function() {
                            tracker.sendAppView("Wella Products");
                            $modalInstance.close();
                        };

                        $rootScope.cancel = function() {

                            $modalInstance.dismiss('cancel');
                        };
                    };


                    $http.get('js/data/products.json').success(function(data) {
                        $scope.wellaItem = data.wella;

                    });


                    $(function() {


                        $("#wella").resize(function( ) {

                            if ($(this).height() <= 150) {
                                $scope.$apply(function() {
                                    $scope.wellaPivot = 'miniHeight';

                                });

                            } else if ($(this).width() <= 150) {
                                $scope.$apply(function() {
                                    $scope.wellaPivot = 'miniWidth';
                                });

                            } else if ($(this).height() === 360) {
                                $scope.$apply(function() {
                                    $scope.wellaPivot = 'normal';

                                });

                            } else {
                                $scope.$apply(function() {
                                    $scope.wellaPivot = 'expanded';
                                });

                            }
                        });


                    });







                })

                .controller('paulCTRL', function($scope, $http, $modal, $timeout, $rootScope) {
                    //ga('send', 'pageview', 'paul mitchell view');
                    $scope.expand = function() {
                        tracker.sendAppView("PaulMitchell Products");
                    };

                    $scope.paulMitchell;
                    $scope.desin = {};
                    $scope.open = function(item) {
                        //ga('send', 'pageview', 'paul mitchell modal');
                        tracker.sendAppView("PaulMitchell modal");

                        tracker.sendEvent('PaulMitchell', 'product clicked', item.names);
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/paul/modal.html',
                            controller: ModalInstanceCtrl,
                            resolve: {
                                paulProduct: function() {
                                    return item;
                                }
                            }
                        });

                    };

                    var ModalInstanceCtrl = function($scope, $modalInstance, paulProduct) {

                        $scope.item = paulProduct;
                        $scope.changeBuy = function() {
                            $scope.paulMPivot = 'buyThis';

                        };
                        $scope.changeShare = function() {
                            $scope.paulMPivot = 'shareThis';
                        };
                        $scope.ok = function() {
                            tracker.sendAppView("PaulMitchell Products");
                            $modalInstance.close();
                        };

                        $rootScope.cancel = function() {

                            $modalInstance.dismiss('cancel');
                        };
                    };


                    $http.get('js/data/products.json').success(function(data) {
                        $scope.paulItem = data.paulMitchell;
                        console.log(data.paulMitchell);

                    });


                    $(function() {


                        $("#paulMitchell").resize(function( ) {

                            if ($(this).height() <= 150) {
                                $scope.$apply(function() {
                                    $scope.paulMitchell = 'miniHeight';

                                });

                            } else if ($(this).width() <= 150) {
                                $scope.$apply(function() {
                                    $scope.paulMitchell = 'miniWidth';
                                });

                            } else if ($(this).width() < 600) {
                                $scope.$apply(function() {
                                    $scope.paulMitchell = 'normal';

                                });
                            } else {
                                $scope.$apply(function() {
                                    $scope.paulMitchell = 'expanded';

                                });

                            }
                        });


                    });
                })

                .controller('designerCTRL', function($scope, $http, $modal, $rootScope) {
//ga('send', 'pageview', 'designer view');
                    tracker.sendAppView("Designer Selection");
                    $http.get('js/data/designers.json').success(function(data) {
                        $scope.designers = data.designers;
                        console.log(data.designers);
                    });

                    $scope.open = function(item) {
                        //ga('send', 'pageview', 'designer modal');
                        tracker.sendAppView("Designer modal");

                        tracker.sendEvent('Designer', 'designer clicked', item.name);
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/promotions/designerModal.html',
                            controller: ModalInstanceCtrl,
                            resolve: {
                                designer: function() {
                                    return item;
                                }
                            }
                        });

                    };

                    var ModalInstanceCtrl = function($scope, $modalInstance, designer) {

                        $scope.designer = designer;

                        $scope.ok = function() {
                            //ga('send', 'pageview', 'designer view');
                            tracker.sendAppView("Designer Selection");
                            $modalInstance.close();
                        };

                        $rootScope.cancel = function() {

                            $modalInstance.dismiss('cancel');
                        };
                    };

                });
