#include <iostream>
#include <math.h>
#include <complex>
using namespace std;

double funcX(double x,double y){
	complex<double> num(x,y);
	return real(pow(num,2));
}

double funcY(double x,double y){
	complex<double> num(x,y);
	return imag(pow(num,2));
}

int main(){
	double dx = 10;
	double dy1 = 10;
	double dy2 = 10;
	double scale = 200;
	int iMin = -720;
	int iMax = 720;
	
 	freopen("output.txt", "w", stdout);
 	cout << "[";
	for(int j=iMin;j<=iMax;j += dy2){
		cout << "[";
		for (int i=iMin;i<=iMax;i++) {
	        cout << "[" << scale*funcX(dx*i/scale, j) << ","; 
	        cout << scale*funcY(dx*i/scale, j) << "]," << endl;
	    }
	    cout << "],";
	}
	cout << "]";
    
    freopen("output2.txt", "w", stdout);
    cout << "[";
    for(int j=iMin;j<=iMax;j += dy1){
    	cout << "[";
		for (int i=iMin;i<=iMax;i++) {
	        cout << "[" << scale*funcX(j, dx*i/scale) << ","; 
	        cout << scale*funcY(j, dx*i/scale) << "]," << endl;
	    }
	    cout << "],";
	}
	
	cout << "]";
	
	return 0;
}
