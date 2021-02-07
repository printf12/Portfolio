import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog, BlogPostType } from 'src/app/shared/blog.model';
import { BlogService } from 'src/app/shared/blog.service';
import { CommentService } from 'src/app/shared/comment.service';

@Component({
  selector: 'app-blog-view-details',
  templateUrl: './blog-view-details.component.html',
  styles: [
  ]
})
export class BlogViewDetailsComponent implements OnInit {
  data: any[] = [];
  blogDetails: any = [];
  comment: any = {};
  blogData: any = [];
  url: any;
  imageUrl: any;
  comments: any[] = [];
  commentsUpdated: any = [];
  showCommentReplyInput = false;
  showComments = true;
  showCommentsUpdate = false;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private toastr: ToastrService, public service: BlogService, public commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  interval: any;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.service.getBlogById(id).then((response: any) => {
      console.log(response);
      this.blogDetails = response['data'][0];
    });
    this.getCommentsByBlogId(id);
    this.refreshData(id);
    this.interval = setInterval(() => { 
        this.refreshData(id); 
    }, 5000);
  }

  refreshData(id:any){
   
    this.commentService.getCommentsByBlogId(id).subscribe((data:any) => {
      console.log(id);
      this.comments = data['data'];
    });
    
  }

  getCommentsByBlogId(blogId: any) {
    this.comments = [];
    this.commentService.getCommentsByBlogId(blogId).subscribe((response: any) => {
      this.comments = response.data;
    });
  }

  submitComment(comment: any) {
    let blogId = this.route.snapshot.paramMap.get("id");
    this.service.getBlogById(blogId).then((resp:any) => {
      console.log(resp);
      comment["blogID"] = resp.data[0].id;
      comment["commentedAt"] = this.getDateTime();
      this.commentService.submitComment(comment).subscribe((res:any) => {
        this.toastr.success('Submitted successfully', 'Comment Created');
        this.onReset(comment);
        this.showComments = true;
        this.showCommentsUpdate = true;
        this.commentsUpdated = res;
      });
    })
  }

  onReset(comment:any){
    comment.commentText = '';
    comment.email = '';
    comment.commentedBy = '';
  }

  getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
      minute = '0' + minute;
    }
    var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
    return dateTime;
}





}
