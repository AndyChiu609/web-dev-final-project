'use cient'
import { Typography } from "@material-ui/core";
type HeaderProps = {
  title: string,
  date: string,
  description: string,
}
export default async function Header({
  title,
  date,
  description,
}: HeaderProps) {
    return (
    <div className="flex-col justify-itmes-center md:text-center m-3">
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">
        Wrote at : {date}
      </Typography>
      <Typography variant="body1">
        by  {description}
      </Typography>
    </div>
  )
}
