function onDelete(id) {
	confirm('정말로 삭제하시겠습니까?') ? location.href='/board/delete/'+id : "";
}

function onRemove(id){
	if(confirm('첨부파일을 삭제하시겠ㅅ,ㅂ니까? 삭제시 영구 삭제됩니ㅏㄷ..'))
	$.get('/board/fileRemove/'+id,function(r){

		if(r.code == 200) {
			$('.file-wrap').remove();
			alert("삭제되어습니다.");
		}
		
		else {
			console.log(r.err);
			alert('파일처리에 실패하였습니다.');
		}
	});
}