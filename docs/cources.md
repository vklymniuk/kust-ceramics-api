query GetLaunches {
  courses(pageSize:10) {
    cursor
    hasMore
    courses {
      	courseId
        name
        price
        duration {
          inHours
        	inClasses
        }
        level
        description{
          advantages
        	full
          short
    		}
        canBeRoving
        photos
        links {
          buy
          certificate
          roving
        }
    }
  }	
}