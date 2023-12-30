import { Typography } from "@material-ui/core";
type HeaderProps = {
  title: string,
  date: string,
  description: string,
}
export default function Header({
  title,
  date,
  description,
}: HeaderProps) {
    return (
    <div className="flex-col justify-itmes-center md:text-center m-3">
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Typography variant="body1" component="div">
        Wrote at : {date}
      </Typography>
      <Typography variant="body1" component="div">
        by  {description}
      </Typography>
    </div>
  )
}
