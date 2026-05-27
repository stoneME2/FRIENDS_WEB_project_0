// - > 방 생성 api POST /rooms

/**
 * 1. 로그인 한 유저만 방 생성 가능
 * 2. 방 이름 요청으로 받기
 * 3. 방 생성 
 * 4. 생성자 자동 참여 
 * 5. room insert & room_members insert
 */
// - > 내 방 목록 설계 GET /rooms
// - > 방 상세 조회 GET /rooms/:roomId (권한 검사 ’이 유저가 이 방 멤버가 맞는가?’)
// - > 방 생성 시 uuid/rooms string 후 inviteToken 저장 
// - > 초대 api POST /rooms/join/:token
