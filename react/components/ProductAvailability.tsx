import React, { memo } from 'react'
import type { ProductTypes } from 'vtex.product-context'

import LowStock from './LowStock'
import HighStock from './HighStock'
import ShowAvailable from './ShowAvailable'
import Container from './Container'

interface Props {
  threshold: number
  lowStockMessage?: string
  highStockMessage?: string
  showAvailability?: boolean
  showAvailabilityMessage?: string
  availableQuantity?: ProductTypes.CommercialOffer['AvailableQuantity']
}

function ProductAvailability({
  threshold,
  lowStockMessage,
  highStockMessage,
  showAvailability,
  showAvailabilityMessage,
  availableQuantity,
}: Props) {
  if (!availableQuantity || availableQuantity < 1) {
    return null
  }

  const isLowStock = availableQuantity < threshold

  if (!showAvailability) {
    if (isLowStock && lowStockMessage) {
      return (
        <Container>
          <LowStock
            text={lowStockMessage}
            availableQuantity={availableQuantity}
          />
        </Container>
      )
    }

    if (!isLowStock && highStockMessage) {
      return <HighStock text={highStockMessage} />
    }

    return null
  }

  return (
    <Container>
      <ShowAvailable
        showAvailabilityMessage={showAvailabilityMessage}
        availableQuantity={availableQuantity}
      />
    </Container>
  )
}

export default memo(ProductAvailability)
