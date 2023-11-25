window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;
    const scrollTop = window.pageYOffset;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    const scrolled = window.scrollY;

    if(scrolled >= windowHeight){
        const $progressBar = document.getElementById('progress-bar');
        if(!$progressBar.classList.contains('show')){
            $progressBar.classList.add('show');
        }
    }

    if(scrolled <= windowHeight){
        const $progressBar = document.getElementById('progress-bar');
        if($progressBar.classList.contains('show')){
            $progressBar.classList.remove('show');
        }
    }

    const $progressIndicator = document.getElementById('progress-indicator');

    if(scrollPercent > 90){
        $progressIndicator.style.backgroundColor = '#ff5722';
    }else{
        $progressIndicator.style.backgroundColor = '#5da8a0';
    }

    const progressHeight = scrollPercent > 100 ? 100 : scrollPercent;
    $progressIndicator.style.height = `${progressHeight}%`;
});