'use client'
import { useCard } from "@/hooks/useCard"
import { Button, Typography } from "@material-ui/core";
import Link from "next/link";

export default async function Header() {
    const {cardItem} = useCard();
    return (
    <div className="flex-col justify-itmes-center md:text-center ">
      <Link href={"/"}>
        <Typography variant="h4" component="h1" gutterBottom>
          {cardItem?.title}
        </Typography>
      </Link>
      <Typography variant="body1">
        by {cardItem?.description}
      </Typography>
      {/* <Link href="/" passHref>
        <Button variant="contained" style={{ marginTop: '16px', backgroundColor: '#3f51b5', color: 'white' }}>
          Back to Home
        </Button>
      </Link> */}
      
    </div>
  )
}
