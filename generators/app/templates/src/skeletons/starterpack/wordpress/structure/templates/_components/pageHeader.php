<?php
/**
  Page Header
  ===========
  Wrapper for Logo and Navigation
*/
?>

<header class="c-pageHeader" role="banner">
  <div class="c-pageHeader__inner">
    <div class="c-pageHeader__logo c-pageHeader__block">
      <?php include ( get_template_directory() . '/_components/pagelogo.php' ); ?>
    </div>
    <div class="c-pageHeader__nav c-pageHeader__block">
      <?php include ( get_template_directory() . '/_components/mainnav.php' ); ?>
    </div>
    <div class="c-pageHeader__offcanvas">
      <div class="c-offCanvas__trigger"><span></span><span></span><span></span><span></span></div>
    </div>
  </div>
</header>
