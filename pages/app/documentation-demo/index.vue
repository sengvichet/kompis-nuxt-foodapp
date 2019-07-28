<template lang="html">
  <div>
    <h1 class="app-ui-overlay__page-title
               u-margin-bottom-big
               u-flex-justify-center
               u-text-align-center">This is a centered page title</h1>

   <pre class="code-block">
   &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"app-ui-overlay__page-title
             u-margin-bottom-big
             u-flex-justify-center
             u-text-align-center"</span>> This is a centered section title &lt<span class="element">p</span>/>
   </pre>

   <div class="u-margin-bottom-big">
     &nbsp;
   </div>

    <p class="app-ui-overlay__section-title
              u-text-align-center">This is a centered section title</p>
    <pre class="code-block">
    &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"app-ui-overlay__section-title
              u-text-align-center"</span>> This is a centered section title &lt<span class="element">p</span>/>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">This is a plain section title, with an empty spacer-div below.</p>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <pre class="code-block">
    &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"app-ui-overlay__section-title"</span>> This is a plain section title, with an empty spacer div below. &lt<span class="element">p</span>/>
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"u-margin-bottom-big"</span>>
      <span class="attribute">&amp;nbsp;</span>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">This is an empty list bar. It is the basis of almost every ui-element across the app:</p>
    <div class="list-bar"></div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>&lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">Basic list bar with a title and an arrow icon, for use in menus and links:</p>
    <div class="list-bar">
      <h5 class="list-bar__title">List Bar Title</h5>
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
      &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>List Bar Title&lt/<span class="element">h5</span>>
      &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">Same as the above, but with a click-overlay-div:</p>
    <div class="list-bar">
      <h5 class="list-bar__title">List Bar Title</h5>
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
      <div class="list-bar__click-overlay"></div> <!-- This becomes an invisible overlay that has the pointer-cursor. place @click on this -->
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
      &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>List Bar Title&lt/<span class="element">h5</span>>
      &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__click-overlay"</span>>&lt/<span class="element">div</span>>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>


    <p class="app-ui-overlay__section-title">List bar with subheading:</p>
    <div class="list-bar">
      <div class="list-bar__text-container"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
        <h5 class="list-bar__title">List Bar Title</h5>
        <p class="list-bar__sub-heading">Subheading in which to place additional info</p>
      </div>
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__text-container"</span>> <span class="comment">&lt!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right--></span>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>List Bar Title&lt/<span class="element">h5</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__sub-heading"</span>>Subheading in which to place additional info&lt/<span class="element">p</span>>
      &lt/<span class="element">div</span>>
      &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">List bar with subheading and info-field:</p>
    <div class="list-bar">
      <div class="list-bar__text-container"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
        <h5 class="list-bar__title">List Bar Title</h5>
        <p class="list-bar__sub-heading">Subheading in which to place additional info</p>
        <p class="list-bar__info">Even more info in normal font weight</p>
      </div>
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__text-container"</span>> <span class="comment">&lt!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right--></span>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>List Bar Title&lt/<span class="element">h5</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__sub-heading"</span>>Subheading in which to place additional info&lt/<span class="element">p</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__info"</span>>Even more info in normal font weight&lt/<span class="element">p</span>>
      &lt/<span class="element">div</span>>
      &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">Basic list bar with a title and multiple icons:</p>
    <div class="list-bar">
      <div class="list-bar__text-container">  <!-- the text-container is necessary to group the icons over to the right. -->
        <h5 class="list-bar__title">List Bar Title</h5>
      </div>
      <a href="#" class="list-bar__icon">
        <img class="list-bar__cancel" src="~assets/images/icons/Icon_Close_X_Dark_Teal.svg" />
      </a>
      <!-- Usually, this block with the edit icon will live inside a corresponding edit-modal component -->
      <a href="#" class="list-bar__icon">
        <img class="list-bar__edit" src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
      </a>
      <a href="#" class="list-bar__icon">
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
      </a>
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__text-container"</span>> <span class="comment">&lt!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right--></span>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>List Bar Title&lt/<span class="element">h5</span>>
      &lt/<span class="element">div</span>>
      &lt<span class="element">a</span> <span class="attribute">href</span>=<span class="string">"#"</span> <span class="attribute">class</span>=<span class="string">"list-bar__icon"</span>>
        &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__cancel"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Close_X_Dark_Teal.svg"</span> />
      &lt/<span class="element">a</span>>
      <span class="comment">&lt!-- Usually, this block with the edit icon will live inside a corresponding edit-modal component --></span>
      &lt<span class="element">a</span> <span class="attribute">href</span>=<span class="string">"#"</span> <span class="attribute">class</span>=<span class="string">"list-bar__icon"</span>>
        &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__edit"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Edit_Dark_Teal.svg"</span> />
      &lt/<span class="element">a</span>>
      &lt<span class="element">a</span> <span class="attribute">href</span>=<span class="string">"#"</span> <span class="attribute">class</span>=<span class="string">"list-bar__icon"</span>>
        &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
      &lt/<span class="element">a</span>>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">Basic list bar with warning modifier classes applied</p>
    <div class="list-bar"
        :class="{'list-bar--warning': true}">
      <div class="list-bar__text-container">  <!-- the text-container is necessary to group the icons over to the right. -->
        <h5 class="list-bar__title"
           :class="{'list-bar__title--warning': true}">List Bar Title</h5>
        <p class="list-bar__sub-heading"
          :class="{'list-bar__sub-heading--warning': true}">List bar subheading</p>
      </div>

      <a href="#" class="list-bar__icon">
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
      </a>
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>
        :<span class="attribute">class</span>=<span class="string">"</span>{<span class="string">'list-bar--warning'</span>: <span class="attribute">true</span>}<span class="string">"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__text-container"</span>> <span class="comment">&lt!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right--></span>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>
        :<span class="attribute">class</span>=<span class="string">"</span>{<span class="string">'list-bar__title--warning'</span>: <span class="attribute">true</span>}<span class="string">"</span>>List Bar Title&lt/<span class="element">h5</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__sub-heading"</span>
        :<span class="attribute">class</span>=<span class="string">"</span>{<span class="string">'list-bar__sub-heading--warning'</span>: <span class="attribute">true</span>}<span class="string">"</span>>List bar subheading&lt/<span class="element">p</span>>
      &lt/<span class="element">div</span>>

      &lt<span class="element">a</span> <span class="attribute">href</span>=<span class="string">"#"</span> <span class="attribute">class</span>=<span class="string">"list-bar__icon"</span>>
        &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
      &lt/<span class="element">a</span>>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">Warning-list bar with a "warning flag" for added urgency</p>
    <!-- Replace the 'true' in the class bindings with some check to see whether or not a warning is due -->
    <div class="list-bar"
        :class="{'list-bar--warning': true}">
      <div v-if="true" class="list-bar__warning-flag">
        <p class="list-bar__warning-flag__content">!</p>
      </div>
      <div v-if="true" class="list-bar__warning-flag--spacer">
        <!-- this is just here to move the text over. A refactor of list-bar.scss to not have padding on outer div is required to use WarningFlag component.  -->
      </div>
      <div class="list-bar__text-container">  <!-- the text-container is necessary to group the icons over to the right. -->
        <h5 class="list-bar__title"
           :class="{'list-bar__title--warning': true}"
           >List Bar Title</h5>
        <p class="list-bar__sub-heading"
          :class="{'list-bar__sub-heading--warning': true}"
          >List bar subheading</p>
      </div>

      <a href="#" class="list-bar__icon">
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
      </a>
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>
        :<span class="attribute">class</span>=<span class="string">"</span>{<span class="string">'list-bar--warning'</span>: <span class="attribute">true</span>}<span class="string">"</span>>
      &lt<span class="element">div</span> <span class="attribute">v-if</span>=<span class="string">"</span><span class="attribute">true</span><span class="string">"</span> <span class="attribute">class</span>=<span class="string">"list-bar__warning-flag"</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__warning-flag__content"</span>>!&lt/<span class="element">p</span>>
      &lt/<span class="element">div</span>>
      &lt<span class="element">div</span> <span class="attribute">v-if</span>=<span class="string">"</span><span class="attribute">true</span><span class="string">"</span> <span class="attribute">class</span>=<span class="string">"list-bar__warning-flag--spacer"</span>>
        <span class="comment">&lt!-- this is just here to move the text over. A refactor of list-bar.scss to not have padding on outer div is required to use WarningFlag component.  --></span>
      &lt/<span class="element">div</span>>

      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__text-container"</span>> <span class="comment">&lt!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right--></span>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>
        :<span class="attribute">class</span>=<span class="string">"</span>{<span class="string">'list-bar__title--warning'</span>: <span class="attribute">true</span>}<span class="string">"</span>>List Bar Title&lt/<span class="element">h5</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__sub-heading"</span>
        :<span class="attribute">class</span>=<span class="string">"</span>{<span class="string">'list-bar__sub-heading--warning'</span>: <span class="attribute">true</span>}<span class="string">"</span>>List bar subheading&lt/<span class="element">p</span>>
      &lt/<span class="element">div</span>>

      &lt<span class="element">a</span> <span class="attribute">href</span>=<span class="string">"#"</span> <span class="attribute">class</span>=<span class="string">"list-bar__icon"</span>>
        &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__arrow"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Right_Arrow.svg"</span> />
      &lt/<span class="element">a</span>>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title">Product card</p>
    <div class="list-bar list-bar__product">
      <div class="list-bar__product-image"
          :style="{'background-image': 'url(https://placekitten.com/400/300)' }"></div>
      <div class="list-bar__product-text">
        <div class="list-bar__product-heading-and-edit">
          <h5 class="list-bar__product-title">Product Name</h5>
          <a href="#" class="list-bar__icon">
            <img class="list-bar__edit" src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
          </a>
        </div>
        <p class="list-bar__product-description">Product description. blabla bla.</p>
      </div>
    </div>

    <pre class="code-block">
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar list-bar__product"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar list-bar__product-image"</span>>
          :<span class="attribute">style</span>=<span class="string">"</span>{<span class="string">'background-image'</span>: <span class="string">'url(</span><span class="url">https://placekitten.com/400/300)</span><span class="string">'</span>}<span class="string">"</span>>&lt/<span class="element">div</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__product-text"</span>>
        &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar__product-heading-and-edit"</span>>
          &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__product-title"</span>>Product Name&lt/<span class="element">h5</span>>
          &lt<span class="element">a</span> <span class="attribute">href</span>=<span class="string">"#"</span> <span class="attribute">class</span>=<span class="string">"list-bar__icon"</span>>
            &lt<span class="element">img</span> <span class="attribute">class</span>=<span class="string">"list-bar__edit"</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Edit_Dark_Teal.svg"</span> />
          &lt/<span class="element">a</span>>
        &lt/<span class="element">div</span>>
        &lt<span class="element">p</span> <span class="attribute">class</span>=<span class="string">"list-bar__product-description"</span>>Product description. blabla bla.&lt/<span class="element">p</span>>
      &lt/<span class="element">div</span>>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title
              u-text-align-center">Basic round button. It has no default icon, add icons with an &ltimg> element</p>

    <button class="round-button" alt="its a button" @click="doStuff()">
      <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
    </button>

    <br>

    <pre class="code-block">
    &lt<span class="element">button</span> <span class="attribute">class</span>=<span class="string">"round-button"</span> @<span class="attribute">click</span>=<span class="string">"</span><span class="function">doStuff</span>()<span class="string">"</span>>
      &lt<span class="element">img</span> <span class="attribute">src</span>=<span class="string">"~assets/images/icons/Icon_Plus_Dark_Teal.svg"</span>/>
    &lt/<span class="element">button</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <div class="u-flex-justify-center
                u-text-align-center">
      <p class="app-ui-overlay__section-title">The loader button. <br> It emits an event 'was_clicked', when the loader completes</p>
      <LoaderButton @was_clicked="doStuff()"/>
      <p v-if="clicked" class="app-ui-overlay__section-title">It works!</p>
    </div>

    <pre class="code-block">

    &lt<span class="element">LoaderButton</span> @<span class="attribute">was_clicked</span>=<span class="string">"</span><span class="function">doStuff</span>()<span class="string">"</span>/>

    <span class="import">import</span> <span class="element">LoaderButton</span> <span class="import">from</span> <span class="string">'~/components/Inputs/LoaderButton.vue'</span>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <div class="u-flex-justify-center
                u-text-align-center">
      <p class="app-ui-overlay__section-title">The Delete Button. <br> It emits an event 'was_clicked', when the loader completes, and has an optional yes/no prompt for extra critical stuff like shops. Simply add a message in the prompt-prop to display it, or leave it empty to hide it</p>
      <DeleteButton :prompt="'Are you sure? Bad idea, but your call..'"
                    @was_clicked="deleteStuff()"/>
      <p v-if="clickedDelete" class="app-ui-overlay__section-title">You deleted the thing!</p>
    </div>

    <pre class="code-block">

    &lt<span class="element">DeleteButton</span> @<span class="attribute">was_clicked</span>=<span class="string">"</span><span class="function">deleteStuff</span>()<span class="string">"</span>
                  :<span class="attribute">prompt</span>=<span class="string">"'Are you sure? Bad idea, but your call..'"</span>/>

    <span class="import">import</span> <span class="element">DeleteButton</span> <span class="import">from</span> <span class="string">'~/components/General/DeleteButton.vue'</span>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title
              u-text-align-center">Basic square text-button.</p>
    <div class="app-ui-overlay">
      <button class="button-square" @click="doStuff()">
        Button Text
      </button>
    </div>

    <br>

    <pre class="code-block">
    &lt<span class="element">button</span> <span class="attribute">class</span>=<span class="string">"button-square"</span> @<span class="attribute">click</span>=<span class="string">"</span><span class="function">doStuff</span>()<span class="string">"</span>>
      Button Text
    &lt/<span class="element">button</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <p class="app-ui-overlay__section-title
              u-text-align-center">Inline Buttons.</p>
    <div class="list-bar--inline-items">
      <div class="list-bar">
        <div class="list-bar__text-container">
          <h5 class="list-bar__title">Inline Upload button</h5>
        </div>
      </div>

      <button class="inline-button
                     inline-button--upload
                     u-margin-left-default">
        &nbsp;
      </button>
    </div>

    <div class="list-bar--inline-items">
      <div class="list-bar">
        <div class="list-bar__text-container">
          <h5 class="list-bar__title">Inline Delete Button</h5>
        </div>
      </div>

      <button class="inline-button
                     inline-button--delete
                     u-margin-left-default">
        &nbsp;
      </button>
    </div>

    <pre class="code-block">
    <span class="comment"> &lt!-- the upload version --> </span>
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar--inline-items"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>Inline Upload Button&lt/<span class="element">h5</span>>
      &lt/<span class="element">div</span>>

      &lt<span class="element">button</span> <span class="attribute">class</span>=<span class="string">"inline-button
                     inline-button--upload
                     u-margin-left-default"</span>
              @<span class="attribute">click</span>=<span class="string">"</span><span class="function">doStuff</span>()<span class="string">"</span>>
        <span class="attribute">&amp;nbsp;</span>
      &lt/<span class="element">button</span>>
    &lt/<span class="element">div</span>>

    <span class="comment"> &lt!-- the delete version --> </span>
    &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar--inline-items"</span>>
      &lt<span class="element">div</span> <span class="attribute">class</span>=<span class="string">"list-bar"</span>>
        &lt<span class="element">h5</span> <span class="attribute">class</span>=<span class="string">"list-bar__title"</span>>Inline Delete Button&lt/<span class="element">h5</span>>
      &lt/<span class="element">div</span>>

      &lt<span class="element">button</span> <span class="attribute">class</span>=<span class="string">"inline-button
                     inline-button--delete
                     u-margin-left-default"</span>
              @<span class="attribute">click</span>=<span class="string">"</span><span class="function">doStuff</span>()<span class="string">"</span>>
        <span class="attribute">&amp;nbsp;</span>
      &lt/<span class="element">button</span>>
    &lt/<span class="element">div</span>>
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>

    <div class="u-flex-justify-center">
      <p class="app-ui-overlay__section-title">The Modal Component. <br><br> It is a component with props for title, footer-text, type of footer ('save' is the green save-button) and z-index for ensuring proper layering of multiple modals etc. It has a template slot for any content that's needed such as input fields etc. <br> <br>The ModalBody.vue needs to be nested within a separate component for each use, otherwise you will encounter conflicts between multiple instances of ModalBody.vue</p>
      <div class="app-ui-overlay__new-object
                  u-margin-bottom-big">
        <div class="button-square" href="#" @click="showModal()">
          Show modal
        </div>
      </div>

      <ModalBody v-if="showDemoModal"
                 z_index="1"
                 footerType="save"
                 title="Modal Header"
                 footerText="Footer Text"
                 @clickedSave="closeModal()"
                 @close="closeModal()">

        <template slot="modal-content">
          <LoadingAnimation/>
        </template>
      </ModalBody>
    </div>

    <pre class="code-block">

      &ltModalBody v-if="showDemoModal"
                 z_index="1"
                 footerType="save"
                 title="Modal Header"
                 footerText="Footer Text"
                 @clickedSave="closeModal()"
                 @close="closeModal()">

        &lttemplate slot="modal-content">
          &ltLoadingAnimation/>
        &lt/template>
      &lt/ModalBody>

    <span class="import">import</span> <span class="element">ModalBody</span> <span class="import">from</span> <span class="string">'~/components/modals/ModalBody.vue'</span>

    <span class="comment">// These two methods are required for the modal to work properly</span>
    methods<span class="function">:</span> {
      <span class="function">showModal</span>(){
        <span class="element">this</span>.<span class="element">$store</span>.<span class="function">dispatch</span>(<span class="string">'lockBody'</span>);
        <span class="element">this</span>.<span class="element">showDemoModal</span> = <span class="attribute">true</span>;
      },
      <span class="function">closeModal</span>(){
        <span class="element">this</span>.<span class="element">$store</span>.<span class="function">dispatch</span>(<span class="string">'freeBody'</span>);
        <span class="element">this</span>.<span class="element">showDemoModal</span> = <span class="attribute">false</span>;
      },
    }
    </pre>

    <div class="u-margin-bottom-big">
      &nbsp;
    </div>


  </div>
</template>

<script>
  import LoaderButton from '~/components/Inputs/LoaderButton.vue'
  import ModalBody from '~/components/modals/ModalBody.vue'
  import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
  import DeleteButton from '~/components/General/DeleteButton.vue'

  export default {
    components: {
      ModalBody,
      LoaderButton,
      LoadingAnimation,
      DeleteButton
    },
    data(){
      return {
        clicked: false,
        clickedDelete: false,
        showDemoModal: false
      }
    },
    methods: {
      doStuff(){
        this.clicked = !this.clicked;
      },
      deleteStuff(){
        this.clickedDelete = !this.clickedDelete;
      },
      showModal(){
        this.$store.dispatch('lockBody');
        this.showDemoModal = true;
      },
      closeModal(){
        this.$store.dispatch('freeBody');
        this.showDemoModal = false;
      },
    }
  }
</script>

<style lang="css" scoped>
  /* all app-UI styles are in central SCSS-files, this is only the atom-like code styling */
  .code-block {
    width: 100%;
    background-color: #292d34;
    padding: 0.5rem;
    font-size: 1.6rem;
    color: rgb(169, 176, 186);
    -webkit-user-select: text !important; /* Safari 3.1+ */
    -moz-user-select: text !important; /* Firefox 2+ */
    -ms-user-select: text !important; /* IE 10+ */
    user-select: text !important; /* Standard syntax */
  }

  .element {
    color: rgb(219,106,115);
  }

  .attribute {
    color: rgb(207, 151, 101);
  }

  .string {
    color: rgb(148, 190, 118);
  }

  .comment {
    color: rgb(91, 98, 112);
  }

  .url {
    color: rgb(87, 182, 194);
  }

  .function {
    color: rgb(95, 168, 229);
  }

  .import {
    color: rgb(198, 120, 221);
  }


</style>
