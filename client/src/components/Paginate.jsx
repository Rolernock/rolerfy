import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Paginate({ pages, page, keyword }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(pg => (
          <Pagination.Item
            key={pg + 1}
            as={Link}
            to={
              keyword ? `/search/${keyword}/page/${pg + 1}` : `/page/${pg + 1}`
            }
            active={pg + 1 === page}
          >
            {pg + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  )
}
