import { useState } from 'react'
import { useRecoilState, useRecoilValueLoadable} from 'recoil'
import { imageData } from '@/recoil/selectors/imageSelectors'
import { pageState } from '@/recoil/atoms/pageState'
// CSS
import styles from './CommonFooter.module.scss'

function CommonFooter() {
  // const imageSelector = useRecoilValue(imageData)  //img 데이터
  const imageSelector = useRecoilValueLoadable(imageData)
  const [page, setPage] = useRecoilState(pageState) //현재 페이지 상태
  const [step, setStep] = useState(0)      //페이지네이션의 현재 단계(그룹)

  // 페이지 리스트 UI 생성
  const newArr: number[] = new Array()
  for(let i=1; i<= imageSelector.contents.total_pages; i++) { //useRecoilValue 일때는 바로 .total_pages 이지만 useRecoilStateLoadable은 형식이 달라서 
    newArr.push(i)
  }
  const length = newArr.length
  const divide = Math.floor(length/ 10) + (Math.floor(length % 10) > 0 ? 1 : 0)
  const res = []

  for (let i=0; i<= divide; i++) {
    //배열 0부터 n개씩 잘라 새 배열에 넣기
    res.push(newArr.splice(0,10))
  }

  const pages = res[step].map((item:number, index:number) => {
    if(item < 11) {
      return (
        <button className={index === page - 1 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=> moveToPage(item)}>
          {item}
        </button>
      )
    } else {
      return (
        <button className={index === page - 1 - step * 10 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=> moveToPage(item)}>
          {item}
        </button>
      )
      
    }
  })
  // ------------------------------------------------------------------------------------------------------------------
  const moveToPage = (selected : number) => {
    setPage(selected)
  }
  const moveToPrev = () => {
    if(step === 0) return
    else {
      setStep(step - 1)
      setPage(res[step -1][0])
    }
  }
  const moveToNext = () => {
    if(step < res[step].length - 2) {
      setStep(step + 1)
      setPage(res[step + 1][0])
    }
  }

  return (
    <footer className={styles.footer}>
        <div className={styles.pagination}>
            <button className={styles.pagination__button}>
                <img src="src/assets/icons/icon-arrowLeft.svg" alt="" />
            </button>
            {/* 변경될 UI 부분 */}
            {/* <span>1</span> */}
            {pages}
            <button className={styles.pagination__button}>
                <img src="src/assets/icons/icon-arrowRight.svg" alt="" />
            </button>
        </div>
    </footer>
  )
}

export default CommonFooter