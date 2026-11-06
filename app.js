(function () {
  var input = document.getElementById("videoId");
  var player = document.getElementById("player");
  var layer = document.getElementById("zoomLayer");
  var status = document.getElementById("status");
  var scale = 1;
  var startDistance = 0;
  var startScale = 1;

  function applyScale() {
    scale = Math.max(1, Math.min(3, scale));
    layer.style.transform = "scale(" + scale + ")";
  }
  function getVideoId(value) {
    value = (value || "").trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
    var match = value.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ||
                value.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
                value.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
  }
  document.getElementById("load").addEventListener("click", function () {
    var id = getVideoId(input.value);
    if (!id) {
      status.textContent = "일반 유튜브 영상 링크 또는 11자리 영상 ID를 입력해 주세요.";
      return;
    }
    scale = 1;
    applyScale();
    player.src = "https://www.youtube.com/embed/" + id + "?playsinline=1&controls=1&rel=0";
    status.textContent = "영상 재생을 시도합니다. 워치의 웹 엔진에서 재생이 제한될 수 있습니다.";
  });
  document.getElementById("plus").addEventListener("click", function () {
    scale += 0.25; applyScale();
  });
  document.getElementById("minus").addEventListener("click", function () {
    scale -= 0.25; applyScale();
  });
  document.getElementById("reset").addEventListener("click", function () {
    scale = 1; applyScale();
  });

  document.getElementById("stage").addEventListener("touchstart", function (e) {
    if (e.touches.length === 2) {
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      startDistance = Math.sqrt(dx * dx + dy * dy);
      startScale = scale;
    }
  }, { passive: true });
  document.getElementById("stage").addEventListener("touchmove", function (e) {
    if (e.touches.length === 2 && startDistance > 0) {
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      scale = startScale * (distance / startDistance);
      applyScale();
      e.preventDefault();
    }
  }, { passive: false });
  document.getElementById("stage").addEventListener("touchend", function () {
    startDistance = 0;
  }, { passive: true });
}());
