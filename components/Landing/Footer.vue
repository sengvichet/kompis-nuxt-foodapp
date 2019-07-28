<template>
  <div class="footer">
      <div class="container">
          <div class="row">
              <div class="col-md-5">
                  <div class="ft-left">
                      <div class="footer-img">
                          <img src="~assets/images/icon.png" width="30" alt="Logo">
                      </div>
                      <p>{{$t('landing.footer.copyrights')}}</p>

                  </div>
              </div>
              <div class="col-md-4 offset-sm-3">
                  <div class="ft-right">
                      <ul>
                          <li><a href="#">{{$t('landing.footer.about_us')}}</a>
                          </li>
                          <li><a href="#">{{$t('landing.footer.faq')}}</a>
                          </li>
                          <li><a href="#">{{$t('landing.footer.prices')}}</a>
                          </li>
                          <li><a href="#">{{$t('landing.footer.privacy')}}</a>
                          </li>
                          <li><a href="#">{{$t('landing.footer.contact')}}</a>
                          </li>

                      </ul>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
