import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

type User = {
  id: string;
  name: string;
  avatar: string;
  roles: string[];
  email: string;
};

function BlogAlertDialog({
  triggerButton,
  rows,
}: {
  triggerButton: React.ReactNode;
  rows: User[];
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerButton}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500 font-bold">
            Permanently delete your account
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="cursor-pointer bg-red-700 hover:bg-red-700/70"
              onClick={async () => {
                fetch('/api/v1/user/deletes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rows }),
                })
                  .then(data => {
                    console.log(data);
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BlogAlertDialog;
