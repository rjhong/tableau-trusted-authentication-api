$(document).ready(
  () => {
    //Configuration Area
    $('#submit_config').on('click', () => {
      data = {
        protocol : $('#protocol_btn')[0].value,
        port : $('#port_input_main')[0].value,
        private_ip : $('#private_ip_input')[0].value,
        public_ip : $('#public_ip_input')[0].value
      }
      $.get('/home/config', data, (data, status) => {
        $("#config_result")[0].innerHTML = status + "! config result => " + JSON.stringify(data);
      });
    });

    $('#port_input_main').on('focusout', () => {
      $('#port_input_mirror')[0].value = $('#port_input_main')[0].value;
    });

    //Test Area
    $('#test_btn').on('click', () => {
      let ta_option = JSON.parse($('#ta_option')[0].value);
      $('#spinner')[0].style.display = "block";

      $.get('/api/trusted_url', ta_option,(data, status) => {
        $('#ticket')[0].innerHTML = data.substring(data.indexOf('/trusted/')+9, data.indexOf('/', data.indexOf('/trusted/')+9));
        $('#alert')[0].setAttribute("class", "alert alert-success");
        $('#alert')[0].innerHTML = status;
        $('#alert')[0].style.display = "block";
        $('#spinner')[0].style.display = "none";
        $('#trusted_url')[0].setAttribute("href", data);
        $('#trusted_url')[0].innerHTML = word_break(data, 100);
      })
      .fail((data, status) => {
        console.log(data);
        $('#alert')[0].setAttribute("class", "alert alert-danger");
        $('#alert')[0].innerHTML = JSON.stringify(data.responseJSON);
        $('#alert')[0].style.display = "block";
        $('#spinner')[0].style.display = "none";
      });
    });

    let viz;
    $('#embed_btn').on('click', () => {
      let viz_container = $('#viz_container')[0];

      url = $('#trusted_url')[0].href;
      options = {
        hideTabs: true
      };
      if(viz != null) viz.dispose();
      viz = new tableau.Viz(viz_container, url, options);
    });

    //How to use Area
    $('#copy_btn').on('click', () => {
      let ta_option = JSON.parse($('#ta_option')[0].value);      
      $('#user_name')[0].setAttribute('value', ta_option.user_name);
      if(ta_option.target_site != null) $('#target_site')[0].setAttribute('value', ta_option.target_site);
      $('#workbook')[0].setAttribute('value', ta_option.workbook);
      $('#sheet')[0].setAttribute('value', ta_option.sheet);
    });

    $('#final_btn').on('click', () => {
      let url = 'http://'
      + $('#ws_ip')[0].value + ":8080/api/trusted_url?"
      + "user_name=" + $('#user_name')[0].value +"&"
      + "target_site=" + $('#target_site')[0].value +"&"
      + "workbook=" + $('#workbook')[0].value +"&"
      + "sheet=" + $('#sheet')[0].value
      $('#final_link')[0].innerHTML = url;
      $('#final_link')[0].href = url;
    });

});

//Configuration Area
function change_protocol(){
  let btn = document.getElementsByName("protocol_btn");
  let input = document.getElementsByName("port_input");
  if(btn[0].innerHTML == "https://"){
    btn[0].setAttribute("class", "btn btn-outline-secondary");
    btn[0].setAttribute("value", "http");
    btn[0].innerHTML = "http://"
    btn[1].setAttribute("class", "btn btn-outline-secondary");
    btn[1].setAttribute("value", "http");
    btn[1].innerHTML = "http://"
    input[0].value="80"
    input[1].value="80"
  }else{
    btn[0].setAttribute("class", "btn btn-outline-success");
    btn[0].setAttribute("value", "https");
    btn[0].innerHTML = "https://"
    btn[1].setAttribute("class", "btn btn-outline-success");
    btn[1].setAttribute("value", "https");
    btn[1].innerHTML = "https://"
    input[0].value="443"
    input[1].value="443"
  }
}

//Test Area
function extract_link(){
  let link = $('#viz_link')[0].value;
  let workbk_vw = link.substring(link.indexOf('views')+6, link.indexOf('?'));
  let workbk = workbk_vw.split('/')[0];
  let vw = workbk_vw.split('/')[1];
  let ta_option = {
    user_name : $('#username')[0].value,
    workbook : workbk,
    sheet : vw
  };
  if(link.indexOf('/t/') != -1){
    let site = link.substring(link.indexOf('/t/')+3, link.indexOf('/', link.indexOf('/t/')+3));
    ta_option.target_site = site
  }  
  $('#ta_option')[0].value = JSON.stringify(ta_option, null, 2);
}

function word_break(source, length){
  let i = length;
  while(source.length > i){
    source = source.substring(0, i) + "<br>" + source.substring(i);
    i += length;
  }
  return source;
}







