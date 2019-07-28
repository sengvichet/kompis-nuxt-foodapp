<template>
<div>
  <div class="hero-2">
      <div class="container">
          <div class="row section1">
              <div class="col-lg-5 col-md-6">
                  <div class="intro">
                       <h1 class="wow fadeInDown" data-wow-delay="0.1s">{{$t('landing.intro_title')}}</h1>

                      <p class="wow fadeInDown" data-wow-delay="0.2s">
                        {{$t('landing.intro_text')}}
                      </p>
                        <a href="#subscribe" class="btn btn-action btn-fb wow fadeInDown"
                      data-wow-delay="0.3s"><span>{{$t('landing.intro_action')}}</span></a>
                  </div>
              </div>
              <div class="col-lg-7 col-md-6">
                  <img class="img-fluid" src="~assets/images/ipad_ui_new_allgood.png" alt="Feature">
              </div>
          </div>
      </div>
  </div>
  <!-- Pi-Hero -->
  <div id="services" class="pi-points">
      <div class="container">
          <div class="row text-center">
              <div class="col-md-8 offset-sm-2">
                  <div class="points-intro text-center">
                       <h1 class="wow fadeInDown">{{$t('landing.services_title')}}</h1>
                  </div>
              </div>
              <div class="col-md-4 wow fadeInDown" data-wow-delay="0.1s">
                  <div class="point-icon">
                      <img src="~assets/icons/4.png" width="45" alt="Feature">
                  </div>
                  <div class="point-text">
                       <h1>{{$t('landing.service1_title')}}</h1>
                      <p>{{$t('landing.service1_text')}}</p>
                  </div>
              </div>
              <div class="col-md-4 wow fadeInDown" data-wow-delay="0.1s">
                  <div class="point-icon">
                      <img src="~assets/icons/1.png" width="45" alt="Feature">
                  </div>
                  <div class="point-text">
                    <h1>{{$t('landing.service2_title')}}</h1>
                   <p>{{$t('landing.service2_text')}}</p>
                  </div>
              </div>
              <div class="col-md-4 wow fadeInDown" data-wow-delay="0.2s">
                  <div class="point-icon">
                      <img src="~assets/icons/3.png" width="45" alt="Feature">
                  </div>
                  <div class="point-text">
                    <h1>{{$t('landing.service3_title')}}</h1>
                   <p>{{$t('landing.service3_text')}}</p>
                  </div>
              </div>


          </div>
      </div>
  </div>



</div>

</template>
