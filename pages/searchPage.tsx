import Header from '@/components/Header'
import React from 'react'

type Props = {}

export default function SearchPage({}: Props) {
  return (
    <>
      <Header isAuthenticated={false} />
      <div>Search Page</div>
    </>

  )
}