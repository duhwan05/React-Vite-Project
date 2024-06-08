import { useState } from 'react'
import styles from './CommonSearchBar.module.scss'
import { useRecoilState } from 'recoil'
import { searchState } from '@/recoil/atoms/searchState'

function CommonSearchBar() {
  const [search, setSearch] = useRecoilState(searchState)
  const [text, setText] = useState('')
  
  const onchange = (event) => { //입력 필드 값이 변경될 때 호출되는 함수
    console.log(event.target.value)
    setText(event.target.value)
  }

  const onSearch = () => {  // 검색 버튼을 클릭했을 때 호출되는 함수
    if(text ==='') {
      // input 태그 안에 빈 값으로 검색하였을 때 => searching default value
      setSearch('keora')
    }else {
      setSearch(text)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => { //입력 필드에서 키보드를 눌렀을 때 호출되는 함수
    if(event.key==='Enter') {
      if(text === '') {
          //input 태그 안에 빈 값으로 검색하였을 때 => searching default value
          setSearch('korea')

      }else {
        setSearch(text) //작성한 Input Value 값 할당
      }
    }
  }

  return (
    <div className={styles.searchBar}>
        <div className={styles.searchBar__search}>
            <input type="text" placeholder="찾으실 이미지를 검색하세요." className={styles.searchBar__search__input} value={text} onChange={onchange} onKeyDown={handleKeyDown} />
            <img src="src/assets/icons/icon-search.svg" alt="" onClick={onSearch} />
        </div>
    </div>
  )
}

export default CommonSearchBar