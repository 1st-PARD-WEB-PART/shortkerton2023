
import { useMediaQuery } from 'react-responsive'

const isDesktopOrMobile = () => useMediaQuery({ query: '(max-width:768px)' }); // 758px 이하일 때는 모바일 뷰로 바뀐다.


export {isDesktopOrMobile};
