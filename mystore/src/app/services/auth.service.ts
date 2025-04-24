import{Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { UserSelectors } from '../state/user.state.selector';
import { Observable, tap } from 'rxjs';
import { Logout } from '../state/user.state.action';



@Injectable({
  providedIn: 'root'
})




export class authService {
  private apiUrl = 'https://dummyjson.com/auth/login'; // Replace with your API URL 

  private token : string | null = null; // Initialize token as null
 
  constructor(private http: HttpClient, private store: Store) { 
  }


    login(username:string, password:string): Observable<any> {

        return this.http.post<any>(this.apiUrl, { 
                username:username, 
                password:password 
            },
            { 
                headers: { 'Content-Type': 'application/json' } 
            }
        )

    }


    
    logout(): void {
        this.store.dispatch(new Logout()); // Dispatch the action to clear the user from the store
    }

   
}




// fetch('https://dummyjson.com/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
      
//       username: 'emilys',
//       password: 'emilyspass',
//       expiresInMins: 30, // optional, defaults to 60
//     }),
//     credentials: 'include' // Include cookies (e.g., accessToken) in the request
//   })
//   .then(res => res.json())
//   .then(console.log);