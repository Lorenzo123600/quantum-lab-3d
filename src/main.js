// The independent script route never constructs LearningProgress, AudioManager
// or a WebGL renderer; opening it cannot mutate the learner's stored progress.
if(new URLSearchParams(location.search).get('modo')==='apresentador'){
 import('./components/presenter-page.js');
}else{
 import('./app.js');
}
