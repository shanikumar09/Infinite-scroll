const imagecontainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let ready=false;
let imageload=0;
let totalimage=0;
let photosarray=[];
let initialload=true;
//Unsplash Api
let count=5;
const apiKey="1w9mAWk1YDj0LFNDzxobUMEl6TJOiVRwuqxnoWDA9Z4";
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
function imageloaded(){
  console.log('image loaded');
  imageload++;
  console.log(imageload);
  if(imageload===totalimage){
    ready=true;
    loader.hidden=true;

    // initialload=false;
    count=20;
    apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}
// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}
//Create elements from unsplash api
function displayPhotos(){
    imageload=0;
  totalimage=photosarray.length;
  console.log("total images",totalimage);
  // run function for each photo
  photosarray.forEach((photo)=>{
    const item=document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    setAttributes(item,{
      href:photo.links.html,
      target:'_blank'
    });
    //Create <img> for photo
    const img =document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    setAttributes(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description
    });
    // Event Listner, check when each is finished loading
    img.addEventListener('load',imageloaded)
    //put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imagecontainer.appendChild(item);
  })
}
//Get photo from Unsplash api
async function getPhotos(){
  try {
    const response =await fetch(apiUrl);
   photosarray=await response.json();
   displayPhotos();
  // console.log(photosarray);
  // console.log(data);
  } catch (e) {
    //catch the error
    console.log('e');
    getPhotos();
}
}
// check to see if scrolling near bottom to page
window.addEventListener('scroll',()=>{
   // console.log('scrolled');
if(window.innerHeight+window.scrollY >=document.body.offsetHeight-1000&&ready){
  ready=false;
  getPhotos();
  console.log('load more');
}
});
// onload
getPhotos();
