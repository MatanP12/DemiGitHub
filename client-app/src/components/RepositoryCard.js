import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function RepositoryCard({repository}){
    return (
        <Card>
        <CardActionArea onClick={()=>{console.log(repository)}}>
            <CardHeader title={repository.name} subheader={repository.creator} />
            <CardContent>
                <Typography gutterBottom variant="body2" color="text.secondary">
                    {repository.description}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>

    );
}

export default RepositoryCard;