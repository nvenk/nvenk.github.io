  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nikhil Venkatesh | Portfolio</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/snippets.css" rel="stylesheet">
    <link href="css/stylesheet.css" rel="stylesheet">
    <link href="css/responsive.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:100,100italic,700italic,700,400' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/blueimp-gallery.min.css">
    <link rel="stylesheet" href="css/bootstrap-image-gallery.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <div class="row header">
        <p>Nikhil<b>Venkatesh</b></p>
      </div>

      <div class="row about-me">

        <div class="col-xs-4 col-md-4 profile-pic"><div></div></div>

        <div class="col-xs-8 col-md-8 profile-about">
        <p class="abouttext"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus, justo et porttitor pharetra, mauris mauris sollicitudin libero, dictum pulvinar ipsum neque in nisi. Morbi sollicitudin et justo et tristique.  </p>

            
<!-- Old More About Me Section 
        <p class="BottomTitle comp"> More About Me » </p>
        <p class="BottomTitle mobile"> » </p>
-->
            
        <a href="https://drive.google.com/file/d/0B_vcdhUrtLBSaUM4enhXRXlQdk0/view?usp=sharing" target="_blank" class="resume-download circle"></a>
        <div class="resume-tag">Download Resume</div>
                
            
            
        </div>
      </div>

      <div class="row divider">

        <div class="col-md-6 col-xs-6" id="portfolio-text">
          <p>Portfolio</p>
        </div>

        <div class="col-md-6 col-xs-6" id="divider-blank">
          <div class="arrow-right"></div>
        </div>
      </div>

        
      <div class="row sections">
        <div class="col-md-6 design">
          <a href=# class="sections-bg" id="video-gallery-button"><div>Animation</div></a>
        </div>
<!--
        <div class="col-md-4 animation">
          <a href=# class="sections-bg"><div>Design</div></a>
        </div>
-->
        <div class="col-md-6 photography">
          <a href="#photo" class="sections-bg image-gallery-button" id="image-gallery-button"><div>Photography</div></a>

        </div>
      </div>
        
        
      <div class="row contact-divider">
        <div class="col-md-4 col-xs-4" id="get-in-touch">
            <p class="comp">Contact me</p>  
            <p class="mobile">Contact</p>  
        </div>  
        <div class="col-md-8 col-xs-8 contact-container">
          <div class="arrow-right"></div>
            
            <a href="mailto:nikhilv.13@gmail.com" class="social-ic ic-email circle "></a>
            <div class="social-tag email-tag">nikhilv.13@gmail.com</div>
                
            <a href="https://www.facebook.com/nvenk" target="_blank" class="social-ic ic-fb circle"></a>
            <div class="social-tag fb-tag">facebook</div>
            
            <a href="https://plus.google.com/+NikhilVenkatesh" target="_blank" class="social-ic ic-gplus circle"></a>
            <div class="social-tag gp-tag">Google +</div>
            
            <a href="https://in.linkedin.com/in/nvenk/" target="_blank" class="social-ic ic-linkedin circle"></a>
            <div class="social-tag li-tag">LinkedIn</div>
        </div>
      </div>


            <!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->
            <div id="blueimp-gallery" class="blueimp-gallery" data-use-bootstrap-modal="false">
                <!-- The container for the modal slides -->
                <div class="slides"></div>
                <!-- Controls for the borderless lightbox -->
                <h3 class="title"></h3>
                <a class="prev">‹</a>
                <a class="next">›</a>
                <a class="close">×</a>
                <a class="play-pause"></a>
                <ol class="indicator"></ol>
                <!-- The modal dialog, which will be used to wrap the lightbox content -->
                <div class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" aria-hidden="true">&times;</button>
                                <h4 class="modal-title"></h4>
                            </div>
                            <div class="modal-body next"></div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default pull-left prev">
                                    <i class="glyphicon glyphicon-chevron-left"></i>
                                    Previous
                                </button>
                                <button type="button" class="btn btn-primary next">
                                    Next
                                    <i class="glyphicon glyphicon-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        
        
        
        <!-- Photography Gallery Links-->
        <div id="links" style="display:none;">
            <a href="./content/photographs/Ant.jpg" title="" data-gallery>
                <img src="./content/thumbnails/Ant.jpg" alt="Rope">
            </a>
        </div>
        <!-- Photo Gallery End -->
        
        <!-- Experimental PHP list -->
        
        <?php
            echo "<div id='links' style='display:none;'>";
            $photoPath = "./content/photographs/";
            $thumbnailPath = "./content/thumbnails/";
            $dh = opendir($path);
            while ($file = readdir($dh)){
                if($file != "." && $file != ".." && $file != "Thumbs.db" && $file != "index.html" && $file != "index.php")
                {
                    echo "<a href='$photoPath$file' title='' data-gallery>";
                    echo "<img src='$thumbnailPath$file' alt='$file'></a>";
                }
            }
            closedir($dh);
            echo "</div>";
        ?>
        <!--End Experiment -->
        
    </div> <!--Close Main Container -->
      
      
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Bootstrap Gallery Scripts -->
    <script src="//blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
    <script src="js/bootstrap-image-gallery.min.js"></script>
    
    <!-- BlueImp Gallery link to Photos & Animation Tile -->
    <script>
        $('#image-gallery-button').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
        });
    </script>
    <script>
        $('#video-gallery-button').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery([
            {
            title: 'Animation Showreel 2014',
            type: 'text/html',
            vimeo: '94683657',
            poster: 'https://i.vimeocdn.com/video/474625499_960.jpg'
            }
        ], $('#blueimp-gallery').data());
    });
    </script>
    <!-- End BlueImp link-->
      
  </body>
</html>